"use client";

import { createProduct } from '@/app/lib/actions';
import ImageUpload from '@/components/admin/ImageUpload';
import Button from '@/components/Button';
import { useState } from 'react';

export default function NewProductForm() {
    const [images, setImages] = useState<string[]>([]);
    const [specs, setSpecs] = useState<{ key: string; value: string }[]>([{ key: '', value: '' }]);

    const addSpec = () => {
        setSpecs([...specs, { key: '', value: '' }]);
    };

    const removeSpec = (index: number) => {
        const newSpecs = [...specs];
        newSpecs.splice(index, 1);
        setSpecs(newSpecs);
    };

    const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    };

    const handleSubmit = async (formData: FormData) => {
        const result = await createProduct(formData);
        if (!result.success) {
            alert(result.error || 'Failed to create product');
        } else {
            setImages([]);
            setSpecs([{ key: '', value: '' }]);
            window.location.href = '/admin/products';
        }
    };

    return (
        <form action={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="space-y-4 rounded-xl border border-white/10 bg-[#111] p-6">
                <h2 className="text-xl font-bold text-white mb-6">Basic Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Product Name</label>
                        <input type="text" name="name" required className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-400 mb-2">Price (₹)</label>
                         <input type="number" name="price" required className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" />
                    </div>
                </div>

                <div>
                     <label className="block text-sm font-medium text-gray-400 mb-2">Stock Quantity</label>
                     <input type="number" name="stock" required defaultValue={0} min={0} className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                    <input type="text" name="category" placeholder="e.g. Laptop" required className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea name="description" rows={4} required className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" />
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111] p-6">
                <h2 className="text-xl font-bold text-white mb-6">Images</h2>
                <ImageUpload 
                    value={images} 
                    onUpload={(url) => setImages([...images, url])}
                    onRemove={(url) => setImages(images.filter((i) => i !== url))}
                />
                <input type="hidden" name="imageUrls" value={images.join(',')} />
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111] p-6">
                <h2 className="text-xl font-bold text-white mb-6">Specifications</h2>
                <div className="space-y-4">
                    {specs.map((spec, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <input 
                                type="text" 
                                name="specKey"
                                placeholder="Feature (e.g. CPU)" 
                                value={spec.key}
                                onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                                className="flex-1 rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" 
                            />
                            <input 
                                type="text" 
                                name="specValue"
                                placeholder="Value (e.g. i9-14900K)" 
                                value={spec.value}
                                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                className="flex-1 rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-[var(--color-neon-blue)] focus:outline-none" 
                            />
                            <button type="button" onClick={() => removeSpec(index)} className="text-red-500 hover:text-red-400">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addSpec} className="text-[var(--color-neon-blue)] text-sm font-bold hover:underline">
                        + Add Specification
                    </button>
                </div>
            </div>

            <Button type="submit" variant="primary" glow className="w-full">
                Create Product
            </Button>
        </form>
    );
}
