import { create } from 'zustand'
import { CartItem, ShippingAddress } from '@/types'

interface CartStore {
  items: CartItem[]
  shippingAddress: ShippingAddress | null
  
  // Actions
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setShippingAddress: (address: ShippingAddress) => void
  
  // Getters
  getItemCount: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  shippingAddress: null,

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.product_id === item.product_id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product_id === item.product_id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        }
      }
      return { items: [...state.items, item] }
    })
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((i) => i.product_id !== productId),
    }))
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.product_id === productId ? { ...i, quantity } : i
      ),
    }))
  },

  clearCart: () => set({ items: [], shippingAddress: null }),

  setShippingAddress: (address) => set({ shippingAddress: address }),

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
  },
}))
