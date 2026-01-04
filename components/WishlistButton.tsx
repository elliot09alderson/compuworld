"use client";

import { Heart } from 'lucide-react';
import { toggleWishlist } from '@/app/lib/actions';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface WishlistButtonProps {
    productId: string;
    initialIsLiked: boolean;
    userId?: string;
}

export default function WishlistButton({ productId, initialIsLiked, userId }: WishlistButtonProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggle = () => {
        if (!userId) {
            router.push('/login');
            return;
        }

        // Optimistic update
        setIsLiked(!isLiked);

        startTransition(async () => {
            const res = await toggleWishlist(productId, userId);
            if (!res.success) {
                // Revert if failed
                setIsLiked(isLiked);
            }
        });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className={`p-3 rounded-full border transition-all duration-300 ${
                isLiked 
                ? 'bg-[var(--color-neon-blue)]/10 border-[var(--color-neon-blue)] text-[var(--color-neon-blue)]' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
        >
            <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
        </button>
    );
}
