import { create } from "zustand";
import { Product } from "@/payload-types";

type CartItem = {
  product: Product;
};

type CartProps = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const useCart = create<CartProps>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => ({ items: [...state.items, { product }] })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}));

export default useCart;
