export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compare_at_price: number | null
  sku: string | null
  inventory_count: number
  images: string[]
  category: string | null
  tags: string[]
  variants: ProductVariant[]
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  size?: string
  color?: string
  price?: number
  inventory?: number
}

export interface CartItem {
  id: string
  product_id: string
  product_name: string
  product_image: string
  variant: ProductVariant | null
  quantity: number
  unit_price: number
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  itemCount: number
}

export interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  status: string
  total: number
  items: OrderItem[]
  created_at: string
}

export interface OrderItem {
  id: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
  product_image: string
}
