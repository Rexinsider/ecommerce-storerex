'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') || ''

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
        <p className="text-lg font-semibold text-gray-900 mb-6">
          Order #{orderNumber}
        </p>
        <p className="text-gray-500 text-sm mb-8">
          A confirmation email has been sent with your order details.
        </p>
        <div className="space-y-3">
          <Link
            href="/orders"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            View Orders
          </Link>
          <Link
            href="/products"
            className="block w-full text-blue-600 hover:text-blue-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
