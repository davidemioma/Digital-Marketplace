import { create } from "zustand";
import { Product } from "@/payload-types";
import { persist, createJSONStorage } from "zustand/middleware";

type CartItem = {
  product: Product;
};

type CartProps = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const useCart = create<CartProps>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          return { items: [{ product }, ...state.items] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
