import { Metadata } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';
import AddToCartButton from '@/components/AddToCartButton';
import WishlistButton from '@/components/WishlistButton';
import { auth } from '@/auth';
import { ShoppingCart, Share2, Shield, Truck, Cpu, Layers, Star, Zap } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getProduct(id: string) {
  try {
    await dbConnect();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    return null;
  }
}

async function getSuggestedProducts(category: string, currentId: string) {
  try {
    await dbConnect();
    const products = await Product.find({
      category,
      _id: { $ne: currentId }
    }).limit(4).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} | CompuWorld`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images && product.images.length > 0 ? [{ url: product.images[0] }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.images && product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  const session = await auth();

  if (!product) {
    notFound();
  }

  const suggestedProducts = await getSuggestedProducts(product.category, product._id);

  return (
    <div className="min-h-screen bg-[#050510] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
       {/* Global Background Elements */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-neon-blue)]/5 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-neon-purple)]/5 rounded-full blur-[150px]"></div>
       </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb / Category */}
        <div className="mb-8 flex items-center space-x-2 text-sm">
           <span className="text-gray-500">Shop</span>
           <span className="text-gray-700">/</span>
           <span className="text-[var(--color-neon-blue)] font-bold uppercase tracking-wider font-[family-name:var(--font-orbitron)]">{product.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Gallery Section */}
          <div className="bg-black/20 rounded-2xl border border-white/5 p-4 backdrop-blur-sm">
             <ProductGallery images={product.images} />
          </div>

          {/* Details Section */}
          <div className="text-white flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 font-[family-name:var(--font-orbitron)] tracking-wide leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-white/10">
              <span className="text-4xl md:text-5xl font-bold text-[var(--color-neon-green)] drop-shadow-[0_0_10px_rgba(34,197,94,0.3)] font-[family-name:var(--font-orbitron)]">
                ₹{product.price.toLocaleString()}
              </span>
              
              <div className="h-8 w-[1px] bg-white/20"></div>

              {product.stock > 0 ? (
                 <span className="text-[var(--color-neon-blue)] text-sm font-bold flex items-center bg-[var(--color-neon-blue)]/10 px-3 py-1.5 rounded-full border border-[var(--color-neon-blue)]/20">
                    <span className="w-2 h-2 bg-[var(--color-neon-blue)] rounded-full mr-2 animate-pulse"></span>
                    IN STOCK
                 </span>
              ) : (
                <span className="text-red-500 text-sm font-bold flex items-center bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    OUT OF STOCK
                 </span>
              )}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 bg-black/40 p-6 rounded-xl border border-white/10">
              {Object.entries(product.specs || {}).map(([key, value]: [string, any]) => (
                <div key={key} className="flex flex-col">
                  <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1 font-[family-name:var(--font-orbitron)]">{key}</h4>
                  <p className="font-medium text-white break-words">{value}</p>
                </div>
              ))}
               {(!product.specs || Object.keys(product.specs).length === 0) && (
                 <div className="col-span-2 text-center text-gray-500 italic text-sm">No additional specs available</div>
               )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                 <AddToCartButton product={product} />
              </div>
              <WishlistButton 
                productId={String(product._id)} 
                initialIsLiked={false} 
                userId={session?.user?.id}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
               <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--color-neon-blue)] transition-colors group">
                 <Truck className="w-5 h-5 text-[var(--color-neon-green)] group-hover:scale-110 transition-transform" />
                 <span className="group-hover:text-white transition-colors">Free Global Shipping</span>
               </div>
               <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--color-neon-blue)] transition-colors group">
                 <Shield className="w-5 h-5 text-[var(--color-neon-green)] group-hover:scale-110 transition-transform" />
                 <span className="group-hover:text-white transition-colors">2 Year Pro Warranty</span>
               </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <section className="border-t border-white/10 pt-16">
             <div className="flex items-center space-x-3 mb-8">
                <Zap className="w-6 h-6 text-[var(--color-neon-purple)]" />
                <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-orbitron)] tracking-wide">
                  TACTICAL <span className="text-[var(--color-neon-purple)]">RECOMMENDATIONS</span>
                </h2>
             </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {suggestedProducts.map((p: any) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
