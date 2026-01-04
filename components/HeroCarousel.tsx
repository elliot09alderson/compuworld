"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', // Gaming Setup 1
    title: 'LEVEL UP YOUR REALITY',
    subtitle: 'Dominate the leaderboards with our elite custom rigs.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2070&auto=format&fit=crop', // Cyberpunk Street/Neon
    title: 'NEXT-GEN PERFORMANCE',
    subtitle: 'Power unmatched. Speed unleash. The future is now.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?q=80&w=2075&auto=format&fit=crop', // RGB Keyboard/Mouse
    title: 'PRECISION ENGINEERED',
    subtitle: 'Peripherals designed for the e-sports professional.'
  },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black group">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              nextSlide();
            } else if (swipe > swipeConfidenceThreshold) {
              prevSlide();
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out scale-105 hover:scale-100"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/60 to-transparent" />
          
           {/* Geometric Accents */}
           <div className="absolute top-0 right-0 p-10 opacity-30">
               <div className="w-64 h-64 border border-[var(--color-neon-blue)] rounded-full animate-pulse"></div>
           </div>
           <div className="absolute bottom-0 left-0 p-10 opacity-30">
               <div className="w-48 h-48 border border-[var(--color-neon-purple)] rotate-45 animate-pulse delay-700"></div>
           </div>


          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
            <div className="max-w-4xl">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight font-[family-name:var(--font-orbitron)]"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--color-neon-blue)] to-[var(--color-neon-purple)] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                    {slides[current].title}
                </span>
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide"
              >
                {slides[current].subtitle}
              </motion.p>
              
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
               >
               </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white border border-white/10 hover:bg-[var(--color-neon-blue)] hover:text-black hover:border-[var(--color-neon-blue)] transition-all z-20 backdrop-blur-sm group-hover:opacity-100 opacity-0 transform -translate-x-4 group-hover:translate-x-0 duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white border border-white/10 hover:bg-[var(--color-neon-blue)] hover:text-black hover:border-[var(--color-neon-blue)] transition-all z-20 backdrop-blur-sm group-hover:opacity-100 opacity-0 transform translate-x-4 group-hover:translate-x-0 duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? 'w-8 bg-[var(--color-neon-blue)] shadow-[0_0_10px_var(--color-neon-blue)]' : 'w-2 bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
