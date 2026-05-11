import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 border-b">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            Admin Panel
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            <Package className="w-5 h-5" />
            Products
          </Link>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            <ShoppingBag className="w-5 h-5" />
            Orders
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            <LogOut className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
