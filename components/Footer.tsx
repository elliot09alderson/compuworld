import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Rocket, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050510] border-t border-white/10 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute bottom-[-50%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]"></div>
       </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <Rocket className="h-8 w-8 text-[var(--color-neon-blue)] group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] transition-all" />
              <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent font-[family-name:var(--font-orbitron)]">
                COMPU WORLD
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Dominate the leaderboard with our elite gaming gear. We build, repair, and upgrade the machines that power your victory.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--color-neon-blue)] transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--color-neon-blue)] transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--color-neon-blue)] transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-[family-name:var(--font-orbitron)] tracking-wide border-b border-[var(--color-neon-purple)] inline-block pb-2">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors hover:pl-2">Gaming Laptops</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors hover:pl-2">Custom PCs</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors hover:pl-2">Peripherals</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors hover:pl-2">Components</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-[family-name:var(--font-orbitron)] tracking-wide border-b border-[var(--color-neon-green)] inline-block pb-2">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="text-gray-400 hover:text-[var(--color-neon-green)] transition-colors hover:pl-2">Repair Services</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[var(--color-neon-green)] transition-colors hover:pl-2">Track Order</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[var(--color-neon-green)] transition-colors hover:pl-2">Warranty Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[var(--color-neon-green)] transition-colors hover:pl-2">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-[family-name:var(--font-orbitron)] tracking-wide border-b border-[var(--color-neon-blue)] inline-block pb-2">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-3 text-[var(--color-neon-blue)] mt-0.5 group-hover:animate-bounce" /> 
                <span>1337 Gamer Blvd, Level 99<br />Tech District, CA 90210</span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 mr-3 text-[var(--color-neon-blue)] group-hover:animate-pulse" /> 
                <span>+1 (800) GAMER-XP</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 mr-3 text-[var(--color-neon-blue)] group-hover:animate-pulse" /> 
                <span>support@compuworld.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} Compu World. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0 space-x-6">
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
             <span className="flex items-center text-xs bg-white/5 px-3 py-1 rounded-full border border-white/5">
                Made with <Heart className="w-3 h-3 text-red-500 mx-1 fill-current" /> by Gamers
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
