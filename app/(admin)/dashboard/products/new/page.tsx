'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewProduct() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const supabase = createBrowserClient()

    try {
      // Upload images
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const fileName = `${Date.now()}-${image.name}`
          const { data } = await supabase.storage
            .from('product-images')
            .upload(fileName, image)
          
          const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(data?.path || fileName)
          
          return publicUrl
        })
      )

      // Create product
      const { error } = await supabase.from('products').insert({
        name: formData.get('name'),
        slug: (formData.get('name') as string)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price') as string),
        sku: formData.get('sku'),
        inventory_count: parseInt(formData.get('inventory') as string) || 0,
        images: imageUrls,
        is_published: formData.get('published') === 'on',
      })

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input name="name" required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price *</label>
          <input name="price" type="number" step="0.01" required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" rows={4} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SKU</label>
          <input name="sku" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Inventory</label>
          <input name="inventory" type="number" defaultValue="0" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files || []))}
            className="w-full"
          />
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" />
          <span className="text-sm">Publish immediately</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}
