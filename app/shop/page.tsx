import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';
import { Metadata } from 'next';
import { Search } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shop | Compu World',
  description: 'Browse our collection of high-performance gaming gear.',
};

// Next.js 15: props.searchParams is a Promise
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getProducts(query?: string) {
  await dbConnect();
  
  let filter = {};
  if (query) {
      filter = {
          $or: [
              { name: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } },
              { category: { $regex: query, $options: 'i' } }
          ]
      };
  }

  const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function ShopPage(props: Props) {
  // Await searchParams in Next.js 15
  const searchParams = await props.searchParams;
  const query = typeof searchParams.query === 'string' ? searchParams.query : undefined;
  
  const products = await getProducts(query);

  return (
    <div className="min-h-screen bg-[#050510] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-8 mt-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-[family-name:var(--font-orbitron)] tracking-wide">
                <span className="text-[var(--color-neon-blue)]">SHOP</span> {query ? `RESULTS: "${query.toUpperCase()}"` : 'ALL'}
            </h1>
            <p className="text-gray-400">
                {query 
                    ? `Found ${products.length} battle-ready items matching your query.` 
                    : 'Discover the best computers, parts, and accessories.'}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
             {query && (
                 <Link href="/shop" className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider flex items-center">
                     Clear Search
                 </Link>
             )}
             <span className="text-gray-500 text-sm font-mono border border-white/10 px-3 py-1 rounded bg-[#0a0a0a]">
                 {products.length} ITEMS
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-24 bg-[#0a0a0a]/50 rounded-3xl border border-dashed border-white/10">
              <div className="flex flex-col items-center justify-center">
                   <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                       <Search className="h-10 w-10 text-gray-600" />
                   </div>
                   <h2 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-orbitron)]">NO SIGNALS DETECTED</h2>
                   <p className="text-gray-500 max-w-md mx-auto mb-8">
                       Your scan for "{query}" returned zero matches. Try adjusting your search parameters or browse our full inventory.
                   </p>
                   <Link href="/shop" className="px-8 py-3 bg-[var(--color-neon-blue)] text-black font-bold rounded-lg hover:bg-[var(--color-neon-purple)] hover:text-white transition-all font-[family-name:var(--font-orbitron)]">
                       VIEW ALL GEAR
                   </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
