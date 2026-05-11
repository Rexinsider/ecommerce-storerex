'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store'
import { formatPrice, generateOrderNumber } from '@/lib/utils'
import { createBrowserClient } from '@supabase/ssr'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, shippingAddress, setShippingAddress, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(shippingAddress || {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'NG',
  })

  const subtotal = getSubtotal()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const orderNumber = generateOrderNumber()

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: form.fullName,
          customer_email: form.email,
          customer_phone: form.phone,
          shipping_address: form,
          subtotal,
          tax,
          shipping_cost: shipping,
          total,
          status: 'confirmed',
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.unit_price * item.quantity,
        product_image: item.product_image,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Update inventory
      for (const item of items) {
        await supabase.rpc('decrement_inventory', {
          product_id: item.product_id,
          quantity: item.quantity,
        })
      }

      clearCart()
      toast.success('Order placed successfully!')
      router.push(`/checkout/success?order=${orderNumber}`)
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address *</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : `Place Order - ${formatPrice(total)}`}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white rounded-lg border p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product_id} className="flex justify-between text-sm">
                <span>{item.product_name} × {item.quantity}</span>
                <span>{formatPrice(item.unit_price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
