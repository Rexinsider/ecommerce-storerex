import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link 
              href="/dashboard/products/new" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add New Product
            </Link>
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 py-2"
            >
              View Store
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-2">Products</h2>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-gray-500 text-sm mt-1">Manage your products</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-2">Orders</h2>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-gray-500 text-sm mt-1">View recent orders</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-2">Revenue</h2>
            <p className="text-3xl font-bold text-purple-600">$0</p>
            <p className="text-gray-500 text-sm mt-1">Total revenue</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                href="/dashboard/products/new"
                className="block w-full text-left px-4 py-2 bg-gray-50 rounded hover:bg-gray-100"
              >
                ➕ Add Product
              </Link>
              <Link 
                href="/dashboard/orders"
                className="block w-full text-left px-4 py-2 bg-gray-50 rounded hover:bg-gray-100"
              >
                📦 View Orders
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Store Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Products</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Orders Today</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
