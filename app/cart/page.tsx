"use client";

import { useCartStore } from '@/lib/store';
import Button from '@/components/Button';
import { Minus, Plus, Trash, ArrowRight, ShoppingBag, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center bg-[#050510] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 w-[500px] h-[500px] bg-[var(--color-neon-blue)]/5 rounded-full blur-[100px] animate-pulse"></div>
        </div>
        
        <div className="relative z-10 mb-8 p-10 bg-white/5 rounded-full border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <ShoppingBag className="h-20 w-20 text-gray-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-orbitron)] tracking-wider">INVENTORY EMPTY</h1>
        <p className="text-gray-400 mb-10 max-w-md mx-auto">Your tactical gear loadout is currently empty. Visit the shop to equip yourself.</p>
        <Link href="/shop">
          <Button variant="primary" glow className="px-8 py-3 text-lg font-bold font-[family-name:var(--font-orbitron)] tracking-wider">
             DEPLOY TO SHOP
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] font-sans py-12 relative">
      {/* Background Elements */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-neon-purple)]/5 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-neon-blue)]/5 rounded-full blur-[150px]"></div>
       </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 font-[family-name:var(--font-orbitron)] tracking-wide">
            TACTICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">LOADOUT</span>
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section className="lg:col-span-8">
            <ul role="list" className="space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.li 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex flex-col sm:flex-row p-6 bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-white/10 transition-all hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_20px_rgba(0,243,255,0.1)] group relative overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    <div className="flex-shrink-0 mb-4 sm:mb-0 relative">
                      <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-[var(--color-neon-blue)]/50 transition-colors">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                          />
                      </div>
                    </div>

                    <div className="ml-0 sm:ml-6 flex flex-1 flex-col justify-between">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-lg font-bold font-[family-name:var(--font-orbitron)] tracking-wide text-white">
                              <Link href={`/product/${item.id}`} className="hover:text-[var(--color-neon-blue)] transition-colors">
                                {item.name}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-2 text-xl font-bold text-[var(--color-neon-blue)] font-mono">₹{item.price.toLocaleString()}</p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 uppercase tracking-wider">
                              <ShieldCheck className="w-3 h-3 mr-1 text-green-500" /> In Stock & Ready to Ship
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9 flex flex-col items-start sm:items-end justify-between">
                          <div className="flex items-center space-x-3 bg-black/40 rounded-full p-1 border border-white/10">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-white font-bold w-6 text-center font-mono">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                          </div>

                          <div className="absolute top-0 right-0 sm:relative sm:top-auto sm:right-auto mt-2">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg flex items-center text-xs uppercase font-bold tracking-wider"
                            >
                              <Trash className="h-4 w-4 mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </section>

          {/* Order summary */}
          <section
            className="mt-16 lg:mt-0 lg:col-span-4"
          >
             <div className="bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 sticky top-24 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 font-[family-name:var(--font-orbitron)] tracking-wide border-b border-white/10 pb-4">
                  REQUISITION SUMMARY
                </h2>

                <dl className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-400">Subtotal</dt>
                    <dd className="font-medium text-white font-mono">₹{totalPrice().toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-400">Shipping Estimate</dt>
                    <dd className="font-medium text-[var(--color-neon-blue)] font-mono">Calculated at Checkout</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <dt className="text-lg font-bold text-white font-[family-name:var(--font-orbitron)]">TOTAL</dt>
                    <dd className="text-2xl font-bold text-[var(--color-neon-green)] font-mono">₹{totalPrice().toFixed(2)}</dd>
                  </div>
                </dl>

                <Link href="/checkout" className="block w-full">
                    <Button variant="primary" glow className="w-full flex justify-center py-4 text-base font-bold tracking-wider font-[family-name:var(--font-orbitron)] bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">
                        PROCEED TO CHECKOUT <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
                
                <p className="mt-6 text-xs text-center text-gray-500 leading-relaxed">
                   Secure military-grade encryption for all transactions. <br/>
                   Estimated dispatch within 24 hours.
                </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
