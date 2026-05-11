import Link from 'next/link'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <Link 
            href="/dashboard/products/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">No products yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Start by adding your first product
          </p>
        </div>
      </div>
    </div>
  )
}
