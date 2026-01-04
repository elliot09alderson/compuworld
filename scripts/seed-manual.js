const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function seed() {
  try {
    // 1. Load Env Vars
    const envPath = path.join(__dirname, '..', '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const uriMatch = envFile.match(/MONGODB_URI=(.*)/);
    const uri = uriMatch ? uriMatch[1] : null;

    if (!uri) {
      console.error('MONGODB_URI not found in .env.local');
      process.exit(1);
    }
    
    // Clean up URI (remove quotes if any)
    const cleanUri = uri.replace(/["']/g, '').trim();

    console.log('Connecting to MongoDB...');
    await mongoose.connect(cleanUri);
    console.log('Connected.');

    // 2. Define Schemas (Simplified)
    const userSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, password: String, role: String, image: String, wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] }, { timestamps: true });
    const productSchema = new mongoose.Schema({ name: String, description: String, price: Number, category: String, images: [String], specs: Object, isFeatured: Boolean, stock: Number }, { timestamps: true });
    const categorySchema = new mongoose.Schema({ name: String, slug: String, description: String, image: String }, { timestamps: true });
    const subcategorySchema = new mongoose.Schema({ name: String, slug: String, parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } }, { timestamps: true });
    const serviceSchema = new mongoose.Schema({ name: String, description: String, priceRange: String, icon: String, estimatedTime: String, category: String });

    const User = mongoose.models.User || mongoose.model('User', userSchema);
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
    const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema);
    const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

    // 3. Clear Data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    await Service.deleteMany({});
    console.log('Cleared existing data.');

    // 4. Insert Data
    // Categories
    const categoryData = [
        { name: 'Laptops', slug: 'laptops', description: 'High-performance gaming laptops', subs: ['Gaming Laptops', 'Creator Laptops', 'Ultrabooks'] },
        { name: 'Desktops', slug: 'desktops', description: 'Custom built gaming PCs', subs: ['Pre-built PCs', 'Custom Builds'] },
        { name: 'Components', slug: 'components', description: 'PC parts for upgrades', subs: ['Graphics Cards', 'Processors', 'Motherboards', 'Memory', 'Storage'] },
        { name: 'Accessories', slug: 'accessories', description: 'Peripherals to enhance your game', subs: ['Mice', 'Keyboards', 'Headsets', 'Monitors'] },
    ];

    for (const cat of categoryData) {
        const catDoc = await Category.create({ 
            name: cat.name, 
            slug: cat.slug, 
            description: cat.description,
            image: `https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800`
        });

        for (const sub of cat.subs) {
            const slug = sub.toLowerCase().replace(/ /g, '-');
            await Subcategory.create({
                name: sub,
                slug: slug,
                parentCategory: catDoc._id
            });
        }
    }
    console.log('Seeded Categories.');

    // Users
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
    console.log('Seeded Users: admin@compuworld.com / admin123');

    // Products
    const products = [
      {
        name: 'Alienware m18 R2 Gaming Laptop',
        description: 'Dominate the competition with the Alienware m18 R2. Featuring 14th Gen Intel Core processors and NVIDIA GeForce RTX 40 Series graphics.',
        price: 249999,
        category: 'Laptops', 
        images: [
            'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/alienware-notebooks/alienware-m18-r2/media-gallery/black/notebook-alienware-m18-r2-black-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=606&qlt=100,1&resMode=sharp2&size=606,402&chrss=full',
            'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/alienware-notebooks/alienware-m18-r2/media-gallery/black/notebook-alienware-m18-r2-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=606&qlt=100,1&resMode=sharp2&size=606,402&chrss=full'
        ],
        specs: { processor: 'Intel Core i9-14900HX', ram: '32GB DDR5', storage: '1TB SSD', gpu: 'NVIDIA GeForce RTX 4080' },
        isFeatured: true,
        stock: 15
      },
      {
        name: 'ASUS ROG Swift OLED PG32UCDM',
        description: '32-inch 4K QD-OLED gaming monitor with 240Hz refresh rate and 0.03ms response time.',
        price: 129999,
        category: 'Accessories',
        images: [
            'https://dlcdnwebimgs.asus.com/gain/4B87C171-4770-4A02-BC02-5396C1DA4C69/w1000/h732',
            'https://dlcdnwebimgs.asus.com/gain/06095066-6C73-4560-9114-16A015560942/w1000/h732'
        ],
        specs: { resolution: '3840 x 2160', refreshRate: '240Hz' },
        isFeatured: true,
        stock: 8
      },
      {
        name: 'Custom Gaming PC - "The Beast"',
        description: 'Ultimate gaming desktop with custom water cooling loops and top-tier components.',
        price: 499999,
        category: 'Desktops',
        images: ['https://nzxt.com/assets/cms/34299/1615585090-h510-elite-white-black-lighting-purple.png?auto=format&fit=crop&h=1000&w=1000'],
        specs: { cpu: 'AMD Ryzen 9 7950X3D', gpu: 'NVIDIA RTX 4090' },
        isFeatured: true,
        stock: 3
      },
       {
        name: 'Razer DeathAdder V3 Pro',
        description: 'Ultra-lightweight wireless ergonomic esports mouse.',
        price: 14999,
        category: 'Accessories',
        images: ['https://assets3.razerzone.com/T0vN9b_yG9-tF5T8S0C6z6N5w0=/1500x1000/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh9e%2Fh3c%2F9423631613982%2Fdeathadder-v3-pro-white-2-1500x1000.jpg'],
        specs: { dpi: '30,000' },
        isFeatured: false,
        stock: 0
      }
    ];
    await Product.insertMany(products);
    console.log('Seeded Products.');

    // Services
    const services = [
      { name: 'Deep Dust Cleaning', description: 'Complete internal cleaning.', priceRange: '$50 - $80', icon: 'Wind', estimatedTime: '2-4 Hours', category: 'Maintenance' },
      { name: 'Hardware Upgrade', description: 'Installation of new RAM, SSD, GPU.', priceRange: '$40 - $100', icon: 'Cpu', estimatedTime: '1-2 Hours', category: 'Upgrade' },
      { name: 'Diagnostics & Repair', description: 'Full system diagnostics.', priceRange: '$30', icon: 'Stethoscope', estimatedTime: '24-48 Hours', category: 'Diagnostics' }
    ];
    await Service.insertMany(services);
    console.log('Seeded Services.');

    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Seed Failed:', error);
    process.exit(1);
  }
}

seed();
