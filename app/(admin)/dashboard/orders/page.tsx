export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500">No orders yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Orders will appear here when customers make purchases
          </p>
        </div>
      </div>
    </div>
  )
}
