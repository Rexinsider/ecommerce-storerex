import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import AddToCartButton from './AddToCartButton'
import { formatPrice } from '@/lib/utils'

async function getProduct(slug: string) {
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
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  return data
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  if (!product) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          {product.inventory_count > 0 ? (
            <div className="mb-6">
              <span className="text-green-600 text-sm">
                ✓ {product.inventory_count} in stock
              </span>
            </div>
          ) : (
            <div className="mb-6">
              <span className="text-red-600 text-sm">Out of stock</span>
            </div>
          )}

          <AddToCartButton product={product} />

          {product.tags?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
