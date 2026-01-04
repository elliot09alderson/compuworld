import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Link from 'next/link';
import { ArrowRight, Wrench, ShieldCheck, Cpu, Zap, Gamepad2 } from 'lucide-react';

async function getFeaturedProducts() {
  await dbConnect();
  const products = await Product.find({ isFeatured: true }).limit(4).lean();
  return JSON.parse(JSON.stringify(products));
}

async function getNewArrivals() {
  await dbConnect();
  const products = await Product.find({ isFeatured: false }).sort({ createdAt: -1 }).limit(4).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const newArrivals = await getNewArrivals();

  return (
    <div className="min-h-screen bg-[#050510] relative overflow-hidden font-sans">
       {/* Global Background Elements */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          <div className="absolute top-[30%] left-[40%] w-[500px] h-[500px] bg-cyan-900/5 rounded-full blur-[150px]"></div>
       </div>

      <div className="relative z-10">
        <HeroCarousel />
        
        {/* Gaming Services Highlight */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-wider font-[family-name:var(--font-orbitron)]">
                 <span className="bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                   UPGRADE
                 </span> YOUR REALITY
               </h2>
               <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                 From custom loops to rapid repairs, we engineer victory.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 hover:border-[var(--color-neon-blue)] transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] hover:-translate-y-2">
                <div className="w-16 h-16 bg-[var(--color-neon-blue)]/10 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300 border border-[var(--color-neon-blue)]/20">
                    <Wrench className="w-8 h-8 text-[var(--color-neon-blue)] group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-orbitron)] tracking-wide">Elite Repairs</h3>
                <p className="text-gray-400 leading-relaxed"> diagnostics and precision repairs for high-end gaming rigs.</p>
              </div>

              <div className="p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 hover:border-[var(--color-neon-purple)] transition-all duration-300 group hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-2">
                <div className="w-16 h-16 bg-[var(--color-neon-purple)]/10 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300 border border-[var(--color-neon-purple)]/20">
                  <Cpu className="w-8 h-8 text-[var(--color-neon-purple)] group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-orbitron)] tracking-wide">Custom Builds</h3>
                <p className="text-gray-400 leading-relaxed">Bespoke battlestations designed to crush 4K benchmarks at max settings.</p>
              </div>

              <div className="p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 hover:border-[var(--color-neon-green)] transition-all duration-300 group hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:-translate-y-2">
                <div className="w-16 h-16 bg-[var(--color-neon-green)]/10 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300 border border-[var(--color-neon-green)]/20">
                   <ShieldCheck className="w-8 h-8 text-[var(--color-neon-green)] group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-orbitron)] tracking-wide">Pro Warranty</h3>
                <p className="text-gray-400 leading-relaxed">Iron-clad support for your gear. We stand behind every frame.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2 text-[var(--color-neon-blue)]">
                 <Zap className="w-5 h-5 animate-pulse" />
                 <span className="text-sm font-bold tracking-widest uppercase font-[family-name:var(--font-orbitron)]">Staff Picks</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-orbitron)]">
                FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">ARSENAL</span>
              </h2>
            </div>
            <Link href="/shop" className="group flex items-center text-white bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-[var(--color-neon-blue)] hover:text-black hover:border-[var(--color-neon-blue)] transition-all duration-300 font-bold tracking-wide font-[family-name:var(--font-orbitron)] text-sm">
              VIEW ARMORY <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-black/20">
                <p className="text-gray-500 text-lg font-[family-name:var(--font-orbitron)]">System Empty. Deploy Seed Script.</p>
              </div>
            )}
          </div>
        </section>
  
         {/* RGB Banner Stripe */}
         <section className="py-24 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-black opacity-80" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
            
            {/* Animated RGB Border Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-neon-blue)] via-[var(--color-neon-purple)] to-[var(--color-neon-green)] animate-gradient-x"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-neon-green)] via-[var(--color-neon-blue)] to-[var(--color-neon-purple)] animate-gradient-x"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 font-[family-name:var(--font-orbitron)] italic">
                  SYSTEM <span className="text-[var(--color-neon-green)]">CRITICAL?</span>
                </h2>
                <p className="text-xl text-gray-200 font-light max-w-xl">
                  Don't let lag kill your streak. Get a professional tune-up today.
                </p>
              </div>
              <Link 
                href="/services" 
                className="relative overflow-hidden group/btn px-10 py-4 bg-white text-black font-extrabold text-lg rounded-none skew-x-[-10deg] hover:text-white transition-colors duration-300"
              >
                 <div className="absolute inset-0 w-0 bg-black transition-all duration-[250ms] ease-out group-hover/btn:w-full"></div>
                 <span className="relative flex items-center">
                    INITIALIZE REPAIR <Wrench className="ml-3 w-5 h-5" />
                 </span>
              </Link>
            </div>
         </section>
  
        {/* New Arrivals */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2 text-[var(--color-neon-green)]">
                 <Gamepad2 className="w-5 h-5 animate-bounce" />
                 <span className="text-sm font-bold tracking-widest uppercase font-[family-name:var(--font-orbitron)]">Fresh Drops</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-orbitron)]">
                LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-green)] to-emerald-600">LOOT</span>
              </h2>
            </div>
            <Link href="/shop" className="group flex items-center text-white bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-[var(--color-neon-green)] hover:text-black hover:border-[var(--color-neon-green)] transition-all duration-300 font-bold tracking-wide font-[family-name:var(--font-orbitron)] text-sm">
              BROWSE ALL <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {newArrivals.length > 0 ? (
              newArrivals.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
               <div className="col-span-full py-10 text-center text-gray-500">No new loot found.</div>
            )}
          </div>
          
          <div className="mt-16 text-center md:hidden">
            <Link href="/shop" className="inline-flex items-center text-[var(--color-neon-blue)] font-bold font-[family-name:var(--font-orbitron)] tracking-wider border-b-2 border-[var(--color-neon-blue)] pb-1">
              FULL INVENTORY <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
