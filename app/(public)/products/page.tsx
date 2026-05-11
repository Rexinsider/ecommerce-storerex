import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import ProductCard from '@/components/store/ProductCard'

async function getProducts() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )

  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return data || []
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      <p className="text-gray-600 mb-8">{products.length} products available</p>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border">
          <h3 className="text-xl font-semibold text-gray-700">No Products Found</h3>
          <p className="text-gray-500 mt-2">Products will appear here once added from the admin dashboard.</p>
        </div>
      )}
    </div>
  )
}
