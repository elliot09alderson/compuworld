import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import { createCategory, createSubcategory } from '@/app/lib/actions';
import Button from '@/components/Button';
import { Plus, Folder } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getData() {
  await dbConnect();
  const categories = await Category.find({}).lean();
  const subcategories = await Subcategory.find({}).populate('parentCategory').lean();
  return { 
      categories: JSON.parse(JSON.stringify(categories)), 
      subcategories: JSON.parse(JSON.stringify(subcategories)) 
  };
}

export default async function CategoriesPage() {
  const { categories, subcategories } = await getData();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Categories & Subcategories</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Create Category Form */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-6">
          <h2 className="mb-4 text-lg font-bold text-white">Add New Category</h2>
          <form action={async (formData) => {
            'use server';
            await createCategory(formData);
          }} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Name</label>
              <input type="text" name="name" required className="w-full rounded-lg border border-white/10 bg-black/50 p-2 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Description</label>
              <textarea name="description" rows={3} className="w-full rounded-lg border border-white/10 bg-black/50 p-2 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Create Category
            </Button>
          </form>
        </div>

        {/* Create Subcategory Form */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-6">
          <h2 className="mb-4 text-lg font-bold text-white">Add Subcategory</h2>
          <form action={async (formData) => {
            'use server';
            await createSubcategory(formData);
          }} className="space-y-4">
             <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Parent Category</label>
              <select name="categoryId" required className="w-full rounded-lg border border-white/10 bg-black/50 p-2 text-white focus:border-[var(--color-neon-blue)] focus:outline-none">
                <option value="">Select Category...</option>
                {categories.map((c: any) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Name</label>
              <input type="text" name="name" required className="w-full rounded-lg border border-white/10 bg-black/50 p-2 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" />
            </div>
            <Button type="submit" variant="secondary" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Create Subcategory
            </Button>
          </form>
        </div>
      </div>

       {/* List Categories */}
       <div className="rounded-xl border border-white/10 bg-[#111] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Existing Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c: any) => (
                <div key={c._id} className="relative rounded-lg border border-white/5 bg-white/5 p-4 hover:border-[var(--color-neon-blue)] transition-colors">
                    <div className="flex items-center mb-2">
                        <Folder className="h-5 w-5 text-[var(--color-neon-blue)] mr-2" />
                        <h3 className="font-bold text-white">{c.name}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{c.description || 'No description'}</p>
                    
                    <div className="border-t border-white/10 pt-2">
                        <p className="text-xs font-semibold text-gray-500 mb-1">Subcategories:</p>
                        <div className="flex flex-wrap gap-2">
                            {subcategories
                                .filter((s: any) => s.parentCategory?._id === c._id || s.parentCategory === c._id)
                                .map((s: any) => (
                                    <span key={s._id} className="bg-black/40 text-gray-300 text-xs px-2 py-1 rounded">
                                        {s.name}
                                    </span>
                                ))}
                            {subcategories.filter((s: any) => s.parentCategory?._id === c._id || s.parentCategory === c._id).length === 0 && (
                                <span className="text-xs text-gray-600 italic">None</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
       </div>
    </div>
  );
}
