'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    setLoading(true)
    
    addItem({
      id: '',
      product_id: product.id,
      product_name: product.name,
      product_image: product.images?.[0] || '',
      variant: null,
      quantity,
      unit_price: product.price,
    })

    toast.success(`${product.name} added to cart!`)
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-2 hover:bg-gray-100"
        >
          -
        </button>
        <span className="px-4 py-2 border-x">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-2 hover:bg-gray-100"
        >
          +
        </button>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={loading || product.inventory_count === 0}
        className="flex-1 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {product.inventory_count === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  )
}
