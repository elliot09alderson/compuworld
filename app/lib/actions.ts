'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import Product from '@/models/Product';
import Order from '@/models/Order';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(
    prevState: string | undefined, 
    formData: FormData
) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }

    try {
        await dbConnect();
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return 'User already exists';
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user' // Default role
        });

        // We can't automatically sign in on server side easily without redirecting to login or custom flow
        return 'success';
    } catch (error) {
        return 'Failed to create user';
    }
}

export async function createCategory(formData: FormData) {
  try {
    await dbConnect();
    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/ /g, '-');
    const description = formData.get('description') as string;

    await Category.create({ name, slug, description });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create category' };
  }
}

export async function createSubcategory(formData: FormData) {
  try {
    await dbConnect();
    const name = formData.get('name') as string;
    const parentCategory = formData.get('categoryId') as string;
    const slug = name.toLowerCase().replace(/ /g, '-');

    await Subcategory.create({ name, parentCategory, slug });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
      console.error(error);
    return { success: false, error: 'Failed to create subcategory' };
  }
}

export async function createProduct(formData: FormData) {
    try {
        await dbConnect();
        
        const name = formData.get('name');
        const description = formData.get('description');
        const price = formData.get('price');
        const stock = formData.get('stock');
        const category = formData.get('category');
        const images = formData.getAll('images'); // Assuming multiple fields with name 'images' OR we handle it as comma separated string
        // better to handle as a hidden input with comma separated URLs provided by client uploader
        const imageUrlsString = formData.get('imageUrls') as string;
        const imageUrls = imageUrlsString ? imageUrlsString.split(',') : [];

        // Specs map
        const specsKeys = formData.getAll('specKey');
        const specsValues = formData.getAll('specValue');
        const specs: any = {};
        specsKeys.forEach((key, index) => {
            if (typeof key === 'string' && key.trim() !== '') {
                specs[key] = specsValues[index];
            }
        });

        await Product.create({
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            category,
            images: imageUrls,
            specs
        });

        revalidatePath('/admin/products');
        revalidatePath('/shop');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to create product' };
    }
}

export async function deleteProduct(id: string) {
    try {
        await dbConnect();
        await Product.findByIdAndDelete(id);
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete product' };
    }
}

export async function toggleUserRole(id: string, currentRole: string) {
    try {
        await dbConnect();
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        await User.findByIdAndUpdate(id, { role: newRole });
        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update user role' };
    }
}

export async function toggleWishlist(productId: string, userId: string) {
    try {
        await dbConnect();
        const user = await User.findById(userId);
        if (!user) return { success: false, error: 'User not found' };

        const isLiked = user.wishlist.includes(productId);

        if (isLiked) {
            await User.findByIdAndUpdate(userId, { $pull: { wishlist: productId } });
        } else {
            await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: productId } });
        }
        revalidatePath('/shop');
        revalidatePath(`/product/${productId}`);
        revalidatePath('/profile');
        return { success: true, isLiked: !isLiked };
    } catch (error) {
        return { success: false, error: 'Failed to update wishlist' };
    }
}

export async function createOrder(data: any) {
    try {
        await dbConnect();
        
        // In a real app, verify prices from DB to avoid client-side manipulation
        const order = await Order.create({
            user: data.userId,
            items: data.items,
            totalAmount: data.totalAmount,
            shippingAddress: data.shippingAddress,
            status: 'pending',
            paymentResult: {
                id: `mock_trans_${Date.now()}`,
                status: 'COMPLETED',
                update_time: String(Date.now()),
                email_address: data.email
            }
        });

        revalidatePath('/profile');
        return { success: true, orderId: order._id };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to create order' };
    }
}
