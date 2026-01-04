"use client";

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  glow?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  glow = false,
  className = '',
  // Separate onDrag to avoid type conflict if it exists in props, or just cast if necessary.
  // The issue is likely passing HTMLButtonAttributes to motion.button.
  // motion.button accepts motion props + HTML props, but there is a mismatch in drag handlers.
  // We can just Omit 'onDrag' from generic props to be safe if we don't need it.
  ...props 
}: ButtonProps) {
  const baseStyles = "relative px-6 py-3 rounded-lg font-bold overflow-hidden transition-all flex items-center justify-center";
  
  const variants = {
    primary: "bg-[var(--color-neon-blue)] text-black hover:bg-[#00d0db]",
    secondary: "bg-[var(--color-neon-purple)] text-white hover:bg-[#a010d8]",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      className={`${baseStyles} ${variants[variant]} ${className} ${glow ? 'shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]' : ''}`}
      {...(props as any)} 
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
}
