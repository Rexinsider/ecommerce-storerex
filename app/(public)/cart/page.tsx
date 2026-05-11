'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore()
  const subtotal = getSubtotal()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to get started!</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({getItemCount()} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product_id} className="bg-white rounded-lg border p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                {item.product_image && (
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-full h-full object-cover rounded"
                  />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.product_name}</h3>
                <p className="text-sm text-gray-500 mt-1">{formatPrice(item.unit_price)} each</p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 border-x text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {formatPrice(item.unit_price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg border p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Proceed to Checkout
          </Link>
          
          <Link
            href="/products"
            className="mt-3 block w-full text-center text-blue-600 hover:text-blue-800 text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
