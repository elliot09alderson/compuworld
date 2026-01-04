"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Rocket, LogIn, LogOut, User, Search, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/lib/store';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Services', href: '/services' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const totalItems = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Focus input when search opens
  useEffect(() => {
      if (isSearchOpen && searchInputRef.current) {
          searchInputRef.current.focus();
      }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
          router.push(`/shop?query=${encodeURIComponent(searchQuery)}`);
          setIsSearchOpen(false);
          setSearchQuery('');
      }
  };

  return (
    <nav className="fixed w-full z-50 bg-[#050510]/90 backdrop-blur-xl border-b border-white/10 font-sans shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section - Hide on mobile when search is open for more space */}
          <div className={`flex items-center ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                 <div className="absolute inset-0 bg-[var(--color-neon-blue)] blur-[10px] opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full"></div>
                 <Rocket className="h-8 w-8 text-[var(--color-neon-blue)] relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
              <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-[var(--color-neon-blue)] via-white to-[var(--color-neon-purple)] bg-clip-text text-transparent font-[family-name:var(--font-orbitron)] group-hover:animate-pulse">
                COMPU WORLD
              </span>
            </Link>
          </div>
          
          {/* Desktop Nav Links - Hidden when search is active on desktop to avoid clutter, or just keep them? Let's keep them but hide if space is needed. For now standard. */}
          <div className={`hidden md:block ${isSearchOpen ? 'opacity-0 pointer-events-none w-0 overflow-hidden' : 'opacity-100 w-auto'} transition-all duration-300`}>
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all hover:text-[var(--color-neon-blue)] font-[family-name:var(--font-orbitron)] group"
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-[var(--color-neon-blue)] shadow-[0_0_10px_var(--color-neon-blue)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 group-hover:text-[shadow:0_0_10px_rgba(0,243,255,0.8)]">{link.name}</span>
                  <div className="absolute inset-0 bg-[var(--color-neon-blue)]/5 opacity-0 group-hover:opacity-100 rounded transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
             
             {/* Animated Search Bar */}
             <div className="relative flex items-center">
                 <AnimatePresence>
                     {isSearchOpen ? (
                         <motion.form 
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 300, opacity: 1 }} // Wider on desktop
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onSubmit={handleSearchSubmit}
                            className="relative flex items-center"
                         >
                             <input 
                                ref={searchInputRef}
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search gear..."
                                className="w-full bg-[#0a0a0a] border-2 border-[var(--color-neon-blue)] text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:shadow-[0_0_15px_var(--color-neon-blue)] font-[family-name:var(--font-orbitron)] text-sm transition-shadow"
                             />
                             <button 
                                type="submit" 
                                className="absolute right-3 text-[var(--color-neon-blue)] hover:text-white transition-colors"
                             >
                                 <ArrowRight className="h-4 w-4" />
                             </button>
                         </motion.form>
                     ) : null}
                 </AnimatePresence>

                 <motion.button 
                   onClick={() => setIsSearchOpen(!isSearchOpen)}
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.95 }}
                   className={`p-2 transition-colors rounded-full ${isSearchOpen ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)]/10'}`}
                 >
                   {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </motion.button>
             </div>

            {/* Cart & Auth - Hide on mobile if search is overwhelmingly large, but 300px is okay for desktop. On Mobile we might need adjustments */}
            <div className={`flex items-center space-x-4 md:space-x-6 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
                <Link href="/cart" className="relative group p-2">
                  <motion.div
                     whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                     transition={{ duration: 0.5 }}
                  >
                      <ShoppingCart className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.div>
                  {mounted && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[var(--color-neon-purple)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-[0_0_10px_var(--color-neon-purple)] animate-bounce-slow border border-white/20">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-6 border-l border-white/10 pl-6 h-8">
                     {session ? (
                      <>
                         <Link href="/profile" className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group">
                            <div className="p-1 rounded-full border border-gray-600 group-hover:border-[var(--color-neon-blue)] transition-colors">
                               <User className="h-4 w-4" />
                            </div>
                         </Link>
                         <button 
                          onClick={() => signOut()}
                          className="flex items-center space-x-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors hover:bg-red-500/10 p-2 rounded-lg"
                        >
                            <LogOut className="h-4 w-4" />
                         </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="text-sm font-bold text-gray-300 hover:text-white transition-colors font-[family-name:var(--font-orbitron)] tracking-wide hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                          LOGIN
                        </Link>
                        <Link href="/register" className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                          <span className="relative flex items-center px-6 py-2 bg-black rounded-full leading-none">
                            <span className="text-[var(--color-neon-blue)] text-sm font-bold font-[family-name:var(--font-orbitron)] tracking-wider group-hover:text-white transition-colors">SIGN UP</span>
                          </span>
                        </Link>
                      </>
                    )}
                </div>
            </div>

            <div className="-mr-2 flex md:hidden">
                {!isSearchOpen && (
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                  >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && !isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050510]/95 backdrop-blur-xl overflow-hidden border-b border-white/10 relative z-40"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-bold font-[family-name:var(--font-orbitron)] tracking-wider ${
                    pathname === link.href
                      ? 'text-[var(--color-neon-blue)] bg-white/5 border-l-4 border-[var(--color-neon-blue)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
              >
                  <span className="flex items-center"><ShoppingCart className="h-5 w-5 mr-3" /> Cart</span>
                  {mounted && totalItems > 0 && (
                    <span className="bg-[var(--color-neon-purple)] text-white text-xs font-bold px-2 py-1 rounded-full shadow-[0_0_10px_var(--color-neon-purple)]">
                      {totalItems} Items
                    </span>
                  )}
              </Link>
              
               <div className="border-t border-gray-800 pt-4 mt-2 px-3 pb-4">
                {session ? (
                  <div className="space-y-3">
                     <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 flex items-center"
                    >
                         <User className="h-5 w-5 mr-3" /> Profile
                    </Link>
                    <button
                        onClick={() => { signOut(); setIsOpen(false); }}
                        className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-white/5 flex items-center"
                    >
                        <LogOut className="h-5 w-5 mr-3" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center py-3 rounded-lg border border-white/10 text-white font-bold font-[family-name:var(--font-orbitron)] hover:border-[var(--color-neon-blue)] transition-colors"
                    >
                        LOGIN
                    </Link>
                    <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white font-bold font-[family-name:var(--font-orbitron)] hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-shadow"
                    >
                        SIGN UP
                    </Link>
                  </div>
                )}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
