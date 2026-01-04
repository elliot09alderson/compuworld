import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import DeleteProductButton from '@/components/admin/DeleteProductButton';

async function getProducts() {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Products ({products.length})</h1>
        <Link 
            href="/admin/products/new"
            className="flex items-center bg-[var(--color-neon-blue)] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#00d0db] transition-colors"
        >
            <Plus className="h-5 w-5 mr-2" /> Add New
        </Link>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#111] overflow-hidden">
         <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-400">
                 <thead className="bg-[#0a0a0a] text-xs uppercase text-gray-400">
                     <tr>
                         <th className="px-6 py-4">Product</th>
                         <th className="px-6 py-4">Category</th>
                         <th scope="col" className="px-6 py-3">Price</th>
                         <th scope="col" className="px-6 py-3">Stock</th>
                         <th scope="col" className="px-6 py-3">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-white/10">
                     {products.map((product: any) => (
                         <tr key={product._id} className="hover:bg-white/5">
                             <td className="px-6 py-4 font-medium text-white flex items-center">
                                 {product.images?.[0] && (
                                     <img src={product.images[0]} alt="" className="h-10 w-10 rounded mr-3 object-cover" />
                                 )}
                                 {product.name}
                             </td>
                             <td className="px-6 py-4">{product.category}</td>
                             <td className="px-6 py-4 text-[var(--color-neon-blue)] font-bold">₹{product.price}</td>
                             <td className="px-6 py-4">{product.stock}</td>
                             <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    <DeleteProductButton id={product._id} />
                                 </div>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
             {products.length === 0 && (
                 <div className="p-8 text-center text-gray-500">
                     No products found. Add one to get started.
                 </div>
             )}
         </div>
      </div>
    </div>
  );
}
