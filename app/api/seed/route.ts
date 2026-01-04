import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Service from '@/models/Service';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await dbConnect();
    
    // Clear existing data
    await Product.deleteMany({});
    await Service.deleteMany({});
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // --- 1. Seed Categories & Subcategories ---
    const categoryData: any = [
        { name: 'Laptops', slug: 'laptops', description: 'High-performance gaming laptops', subs: ['Gaming Laptops', 'Creator Laptops', 'Ultrabooks'] },
        { name: 'Desktops', slug: 'desktops', description: 'Custom built gaming PCs', subs: ['Pre-built PCs', 'Custom Builds'] },
        { name: 'Components', slug: 'components', description: 'PC parts for upgrades', subs: ['Graphics Cards', 'Processors', 'Motherboards', 'Memory', 'Storage'] },
        { name: 'Accessories', slug: 'accessories', description: 'Peripherals to enhance your game', subs: ['Mice', 'Keyboards', 'Headsets', 'Monitors'] },
    ];

    const categoryDocs: any = {};
    const subcategoryDocs: any = {};

    for (const cat of categoryData) {
        const catDoc = await Category.create({ 
            name: cat.name, 
            slug: cat.slug, 
            description: cat.description,
            image: `https://source.unsplash.com/random/800x600/?gaming,${cat.slug}` // Placeholder
        });
        categoryDocs[cat.slug] = catDoc._id; // Store ID for referencing

        for (const sub of cat.subs) {
            const slug = sub.toLowerCase().replace(/ /g, '-');
            const subDoc = await Subcategory.create({
                name: sub,
                slug: slug,
                parentCategory: catDoc._id
            });
            subcategoryDocs[slug] = subDoc._id;
        }
    }
    console.log('Seeded Categories');

    // --- 2. Seed Users (Admin & Customer) ---
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const userHashedPassword = await bcrypt.hash('user123', 10);

    await User.create([
        {
            name: 'Admin User',
            email: 'admin@compuworld.com',
            password: hashedPassword,
            role: 'admin',
            image: ''
        },
        {
            name: 'John Doe',
            email: 'user@compuworld.com',
            password: userHashedPassword,
            role: 'user',
            image: ''
        }
    ]);
    console.log('Seeded Users');

    // --- 3. Seed Products ---
    const products = [
      {
        name: 'Alienware m18 R2 Gaming Laptop',
        description: 'Dominate the competition with the Alienware m18 R2. Featuring 14th Gen Intel Core processors and NVIDIA GeForce RTX 40 Series graphics.',
        price: 2499.99,
        category: 'Laptops', 
        images: ['https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/alienware-notebooks/alienware-m18-r2/media-gallery/black/notebook-alienware-m18-r2-black-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=606&qlt=100,1&resMode=sharp2&size=606,402&chrss=full'],
        specs: {
          processor: 'Intel Core i9-14900HX',
          ram: '32GB DDR5',
          storage: '1TB SSD',
          gpu: 'NVIDIA GeForce RTX 4080',
          display: '18" QHD+ 165Hz'
        },
        isFeatured: true
      },
      {
        name: 'ASUS ROG Swift OLED PG32UCDM',
        description: '32-inch 4K QD-OLED gaming monitor with 240Hz refresh rate and 0.03ms response time.',
        price: 1299.00,
        category: 'Accessories',
        images: ['https://dlcdnwebimgs.asus.com/gain/4B87C171-4770-4A02-BC02-5396C1DA4C69/w1000/h732'],
        specs: {
          resolution: '3840 x 2160',
          refreshRate: '240Hz',
          panel: 'QD-OLED',
          response: '0.03ms'
        },
        isFeatured: true
      },
      {
        name: 'Custom Gaming PC - "The Beast"',
        description: 'Ultimate gaming desktop with custom water cooling loops and top-tier components.',
        price: 4999.99,
        category: 'Desktops',
        images: ['https://nzxt.com/assets/cms/34299/1615585090-h510-elite-white-black-lighting-purple.png?auto=format&fit=crop&h=1000&w=1000'],
        specs: {
          cpu: 'AMD Ryzen 9 7950X3D',
          gpu: 'NVIDIA RTX 4090',
          ram: '64GB DDR5',
          cooling: 'Custom Loop'
        },
        isFeatured: true
      },
      {
        name: 'Razer DeathAdder V3 Pro',
        description: 'Ultra-lightweight wireless ergonomic esports mouse.',
        price: 149.99,
        category: 'Accessories',
        images: ['https://assets3.razerzone.com/T0vN9b_yG9-tF5T8S0C6z6N5w0=/1500x1000/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh9e%2Fh3c%2F9423631613982%2Fdeathadder-v3-pro-white-2-1500x1000.jpg'],
        specs: {
          dpi: '30,000',
          battery: '90 Hours',
          weight: '63g'
        },
        isFeatured: false
      },
      // Synthetic Data
      {
        name: 'NVIDIA RTX 4070 Ti',
        description: 'The ultimate graphics card for 1440p gaming.',
        price: 799.99,
        category: 'Components',
        images: ['https://m.media-amazon.com/images/I/71C8A6M-ubL._AC_SL1500_.jpg'],
        specs: { vram: '12GB GDDR6X', boostClock: '2.61 GHz' },
        isFeatured: false
      },
      {
        name: 'Corsair Vengeance 32GB RAM',
        description: 'High performance DDR5 memory for gaming.',
        price: 129.99,
        category: 'Components',
        images: ['https://m.media-amazon.com/images/I/61b7b7k7k7L._AC_SL1500_.jpg'],
        specs: { speed: '6000MHz', type: 'DDR5' },
        isFeatured: false
      },
       {
        name: 'MSI Raider GE78',
        description: 'Flagship functionality with stunning RGB light bar.',
        price: 2199.99,
        category: 'Laptops',
        images: ['https://asset.msi.com/resize/image/global/product/nb/Raider-GE78-HX-13V-black-rgb-01.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png'],
        specs: { cpu: 'i9-13980HX', gpu: 'RTX 4080' },
        isFeatured: true
      }
    ];

    await Product.insertMany(products);
    console.log('Seeded Products');

    // --- 4. Seed Services ---
    const services = [
      {
        name: 'Deep Dust Cleaning',
        description: 'Complete internal cleaning to remove dust and improve airflow.',
        priceRange: '$50 - $80',
        icon: 'Wind',
        estimatedTime: '2-4 Hours',
        category: 'Maintenance'
      },
      {
        name: 'Hardware Upgrade',
        description: 'Installation of new RAM, SSD, GPU, or CPU.',
        priceRange: '$40 - $100',
        icon: 'Cpu',
        estimatedTime: '1-2 Hours',
        category: 'Upgrade'
      },
      {
        name: 'Diagnostics & Repair',
        description: 'Full system diagnostics to identify hardware or software issues.',
        priceRange: '$30 (Waived if repaired)',
        icon: 'Stethoscope',
        estimatedTime: '24-48 Hours',
        category: 'Diagnostics'
      }
    ];

    await Service.insertMany(services);
    console.log('Seeded Services');

    return NextResponse.json({ 
        success: true, 
        message: 'Database seeded successfully',
        details: {
            adminEmail: 'admin@compuworld.com',
            adminPassword: 'admin123',
            userEmail: 'user@compuworld.com',
            userPassword: 'user123'
        }
    });

  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
