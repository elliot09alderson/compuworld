"use client";

import { useCartStore, CartItem } from '@/lib/store';
import Button from '@/components/Button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      quantity: 1,
    };
    addItem(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (product.stock <= 0) {
      return (
          <Button variant="outline" className="w-full flex justify-center !py-3 opacity-50 cursor-not-allowed" disabled>
              Out of Stock
          </Button>
      );
  }

  return (
    <Button 
        onClick={handleAddToCart} 
        variant="primary" 
        glow 
        className="w-full flex justify-center !py-3"
    >
        {isAdded ? (
            'Added to Cart!'
        ) : (
            <>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </>
        )}
    </Button>
  );
}
