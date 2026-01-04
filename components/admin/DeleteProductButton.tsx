"use client";

import { useTransition } from 'react';
import { deleteProduct } from '@/app/lib/actions';
import { Trash } from 'lucide-react';

export default function DeleteProductButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
      if (confirm('Are you sure you want to delete this product?')) {
          startTransition(async () => {
              await deleteProduct(id);
          });
      }
  };

  return (
    <button
      onClick={onDelete}
      disabled={isPending}
      className="rounded bg-red-500/10 p-2 text-red-500 hover:bg-red-500/20 disabled:opacity-50"
    >
      <Trash className="h-4 w-4" />
    </button>
  );
}
