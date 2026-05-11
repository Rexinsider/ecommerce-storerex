export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function calculateTax(subtotal: number, rate: number = 0.08): number {
  return subtotal * rate
}

export function calculateShipping(subtotal: number): number {
  return subtotal > 100 ? 0 : 9.99
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getImageUrl(path: string | null): string {
  if (!path) return '/placeholder.png'
  return path
}
