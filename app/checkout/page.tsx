"use client";

import { useCartStore } from '@/lib/store';
import { createOrder } from '@/app/lib/actions';
import Button from '@/components/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/checkout');
    }
  }, [status, router]);

  if (status === 'loading') {
      return (
          <div className="flex h-[50vh] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-[var(--color-neon-blue)]"></div>
          </div>
      );
  }

  if (!session) {
      return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsProcessing(true);

      const formData = new FormData(e.currentTarget);
      const shippingAddress = {
          fullName: formData.get('fullName'),
          address: formData.get('address'),
          city: formData.get('city'),
          postalCode: formData.get('postalCode'),
          country: formData.get('country'),
      };

      const orderData = {
          userId: session.user?.id,
          // @ts-ignore
          email: session.user?.email, 
          items: items.map(item => ({
              product: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image
          })),
          totalAmount: totalPrice(),
          shippingAddress
      };

      const res = await createOrder(orderData);
      
      if (res.success) {
          clearCart();
          router.push('/profile'); // Redirect to profile orders tab
      } else {
          alert('Failed to place order');
      }
      setIsProcessing(false);
  };

  if (items.length === 0) {
      return <div className="p-10 text-center text-white">Your cart is empty.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="rounded-xl border border-white/10 bg-[#111] p-6">
            <h2 className="text-xl font-bold text-white mb-6">Shipping Information</h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                   <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                   <input required name="fullName" type="text" className="w-full rounded bg-black/50 border border-white/10 p-2 text-white" defaultValue={session.user?.name || ''} />
                </div>
                <div>
                   <label className="block text-sm text-gray-400 mb-1">Address</label>
                   <input required name="address" type="text" className="w-full rounded bg-black/50 border border-white/10 p-2 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">City</label>
                        <input required name="city" type="text" className="w-full rounded bg-black/50 border border-white/10 p-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Postal Code</label>
                        <input required name="postalCode" type="text" className="w-full rounded bg-black/50 border border-white/10 p-2 text-white" />
                    </div>
                </div>
                <div>
                   <label className="block text-sm text-gray-400 mb-1">Country</label>
                   <input required name="country" type="text" className="w-full rounded bg-black/50 border border-white/10 p-2 text-white" />
                </div>
            </form>
        </div>

        <div>
            <div className="rounded-xl border border-white/10 bg-[#111] p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                 <ul className="divide-y divide-white/10 mb-6">
                    {items.map((item) => (
                        <li key={item.id} className="flex py-4">
                            <img src={item.image} alt="" className="h-16 w-16 rounded object-cover mr-4" />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-white">{item.name}</h3>
                                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </li>
                    ))}
                 </ul>
                 <div className="border-t border-white/10 pt-4 flex justify-between items-center mb-6">
                     <span className="text-lg font-bold text-white">Total</span>
                     <span className="text-2xl font-bold text-[var(--color-neon-blue)]">₹{totalPrice().toFixed(2)}</span>
                 </div>
                 
                 <Button 
                    type="submit" 
                    form="checkout-form"
                    variant="primary" 
                    glow 
                    className="w-full flex justify-center !py-3"
                    disabled={isProcessing}
                 >
                     {isProcessing ? 'Processing Payment...' : 'Place Order'}
                 </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
