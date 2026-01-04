"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return <div className="aspect-video bg-gray-800 rounded-xl" />;
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
        <motion.img
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={selectedImage}
          alt="Product Main"
          className="w-full h-full object-contain p-4"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors bg-white/5 ${
              selectedImage === img ? 'border-[var(--color-neon-blue)]' : 'border-transparent hover:border-white/30'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
