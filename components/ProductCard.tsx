"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="bg-[#111] rounded-lg overflow-hidden border border-white/10 hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all group h-full flex flex-col relative"
      >
        <div className="relative aspect-video overflow-hidden bg-white/5">
           {/* Fallback image if product.images is empty */}
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={product.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={product.name}
            className={`object-cover w-full h-full ${product.stock <= 0 ? 'grayscale opacity-50' : ''}`}
          />
          {product.stock <= 0 && (
             <div className="absolute top-2 right-2 bg-red-500/80 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                 OUT OF STOCK
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
             <span className="text-[var(--color-neon-blue)] font-bold text-sm tracking-widest uppercase">Quick View</span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-xs text-[var(--color-neon-purple)] font-semibold uppercase tracking-wider mb-1">
            {product.category}
          </div>
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-[var(--color-neon-blue)] transition-colors font-[family-name:var(--font-orbitron)] tracking-wide">{product.name}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-white group-hover:text-[var(--color-neon-blue)] transition-colors">
              ₹{product.price.toLocaleString()}
            </span>
            <motion.span 
              whileHover={{ x: 5 }}
              className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300 group-hover:bg-[var(--color-neon-blue)] group-hover:text-black transition-colors"
            >
              Details →
            </motion.span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
