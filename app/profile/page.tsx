import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import WishlistButton from '@/components/WishlistButton';
import AddToCartButton from '@/components/AddToCartButton';
import { Package, Clock, CheckCircle2, XCircle, ChevronRight, User as UserIcon, Shield } from 'lucide-react';

async function getUserData(userId: string) {
    await dbConnect();
    
    // Fetch user with populate wishlist (products)
    const user = await User.findById(userId).populate('wishlist').lean();
    
    // Fetch orders
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).lean();

    return { 
        user: JSON.parse(JSON.stringify(user)), 
        orders: JSON.parse(JSON.stringify(orders)) 
    };
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const { user, orders } = await getUserData(session.user.id!);

  return (
    <div className="min-h-screen bg-[#050510] relative overflow-hidden font-sans py-12">
        {/* Background Elements */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[var(--color-neon-blue)]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-neon-purple)]/5 rounded-full blur-[120px]"></div>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 font-[family-name:var(--font-orbitron)] tracking-wide">
            COMMAND <span className="text-[var(--color-neon-blue)]">CENTER</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl p-8 sticky top-24">
                  <div className="flex flex-col items-center text-center mb-8">
                       <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] p-[2px] mb-4 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                           <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                                <span className="text-4xl font-bold text-white font-[family-name:var(--font-orbitron)]">
                                    {user.name?.[0]?.toUpperCase()}
                                </span>
                           </div>
                       </div>
                       <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-orbitron)] tracking-wider mb-1">{user.name}</h2>
                       <p className="text-gray-400 text-sm font-mono">{user.email}</p>
                  </div>
                  
                  <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-gray-400 text-sm flex items-center">
                              <Shield className="w-4 h-4 mr-2 text-[var(--color-neon-green)]" /> Rank
                          </span>
                          <span className="text-white font-bold uppercase tracking-wider text-sm bg-[var(--color-neon-green)]/10 text-[var(--color-neon-green)] px-2 py-0.5 rounded">
                              {user.role}
                          </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                          <span className="text-gray-400 text-sm flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-[var(--color-neon-blue)]" /> Joined
                          </span>
                          <span className="text-white text-sm">
                              {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
              
              {/* Orders Section */}
              <section>
                  <div className="flex items-center space-x-3 mb-6">
                      <Package className="w-6 h-6 text-[var(--color-neon-blue)]" />
                      <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-orbitron)] tracking-wide">
                          MISSION LOG (ORDERS)
                      </h2>
                  </div>
                  
                  {orders.length === 0 ? (
                      <div className="bg-[#0a0a0a]/50 rounded-2xl border border-dashed border-white/10 p-12 text-center">
                          <p className="text-gray-500 font-[family-name:var(--font-orbitron)] text-lg mb-4">NO ACTIVE MISSIONS</p>
                          <Link href="/shop" className="text-[var(--color-neon-blue)] hover:text-white transition-colors underline">
                              Deploy to Shop
                          </Link>
                      </div>
                  ) : (
                      <div className="space-y-6">
                          {orders.map((order: any) => (
                              <div key={order._id} className="group bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 transition-all hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_20px_rgba(0,243,255,0.1)] relative overflow-hidden">
                                  {/* Hover Glow Effect */}
                                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-neon-blue)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                  
                                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-white/10 gap-4">
                                      <div>
                                          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-[family-name:var(--font-orbitron)]">Order ID</p>
                                          <p className="font-mono text-white text-sm tracking-wider">#{order._id}</p>
                                      </div>
                                      
                                      <div className="flex items-center gap-6">
                                          <div>
                                              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-[family-name:var(--font-orbitron)] text-right">Status</p>
                                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                                  order.status === 'delivered' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                  order.status === 'shipped' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                  order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                  'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                              }`}>
                                                  {order.status === 'delivered' && <CheckCircle2 className="w-3 h-3 mr-1.5" />}
                                                  {order.status === 'cancelled' && <XCircle className="w-3 h-3 mr-1.5" />}
                                                  {order.status === 'pending' && <Clock className="w-3 h-3 mr-1.5 animate-pulse" />}
                                                  {order.status}
                                              </span>
                                          </div>
                                          <div>
                                              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-[family-name:var(--font-orbitron)] text-right">Total</p>
                                              <p className="font-bold text-[var(--color-neon-blue)] text-lg">₹{order.totalAmount.toFixed(2)}</p>
                                          </div>
                                      </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                      {order.items.map((item: any, idx: number) => (
                                          <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                              <div className="flex items-center">
                                                  <span className="text-[var(--color-neon-purple)] font-bold font-mono mr-4 w-8 text-center bg-[var(--color-neon-purple)]/10 rounded px-1">{item.quantity}x</span>
                                                  <span className="text-white font-medium">{item.name}</span>
                                              </div>
                                              <span className="text-gray-400 text-sm font-mono">₹{item.price.toLocaleString()}</span>
                                          </div>
                                      ))}
                                  </div>
                                  
                                  <div className="mt-6 flex justify-between items-center text-xs text-gray-500 font-mono">
                                      <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                                      {order.status === 'delivered' && (
                                         <button className="text-[var(--color-neon-blue)] hover:text-white transition-colors flex items-center group/btn">
                                             DOWNLOAD INVOICE <ChevronRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                         </button>
                                      )}
                                  </div>
                              </div>
                          ))}
                      </div>
                  )}
              </section>

               {/* Wishlist Section */}
               <section>
                   <div className="flex items-center space-x-3 mb-6">
                      <div className="relative">
                          <div className="absolute inset-0 bg-red-500 blur-sm opacity-50 animate-pulse rounded-full"></div>
                           <Shield className="w-6 h-6 text-red-500 relative z-10" />
                      </div>
                      <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-orbitron)] tracking-wide">
                          SAVED LOADOUT (WISHLIST)
                      </h2>
                  </div>
                  
                  {(!user.wishlist || user.wishlist.length === 0) ? (
                      <div className="bg-[#0a0a0a]/50 rounded-2xl border border-dashed border-white/10 p-8 text-center text-gray-500 font-[family-name:var(--font-orbitron)]">
                          LOADOUT EMPTY
                      </div>
                  ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {user.wishlist.map((product: any) => (
                             <div key={product._id} className="bg-[#111] rounded-xl border border-white/10 p-4 transition-all hover:border-[var(--color-neon-purple)] hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] group">
                                 <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-black">
                                     {product.images?.[0] ? (
                                         <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                                     ) : (
                                         <div className="w-full h-full flex items-center justify-center text-gray-700">No Image</div>
                                     )}
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                 </div>
                                 
                                 <h3 className="font-bold text-white text-base mb-1 truncate font-[family-name:var(--font-orbitron)] group-hover:text-[var(--color-neon-purple)] transition-colors">{product.name}</h3>
                                 <p className="text-[var(--color-neon-blue)] font-bold mb-4 font-mono">₹{product.price.toLocaleString()}</p>
                                 
                                 <div className="flex gap-3">
                                     <div className="flex-1">
                                         <AddToCartButton product={product} />
                                     </div>
                                      <WishlistButton 
                                          productId={String(product._id)} 
                                          initialIsLiked={true} 
                                          userId={session.user?.id}
                                      />
                                 </div>
                             </div>
                          ))}
                      </div>
                  )}
              </section>

          </div>
        </div>
      </div>
    </div>
  );
}
