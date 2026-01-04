"use client";

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  onRemove: (url: string) => void;
  value: string[];
}

export default function ImageUpload({ onUpload, onRemove, value }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onUpload(data.url);
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
            <div className="absolute right-2 top-2 z-10">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <img src={url} alt="Uploaded" className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
      <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-black/50 hover:bg-black/70">
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
           {isUploading ? (
               <div className="text-gray-400">Uploading...</div>
           ) : (
                <>
                <Upload className="mb-4 h-8 w-8 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                </>
           )}
        </div>
        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={isUploading} />
      </label>
    </div>
  );
}
