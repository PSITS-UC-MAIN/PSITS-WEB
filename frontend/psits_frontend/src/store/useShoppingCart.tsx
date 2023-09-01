import { MerchandiseSchema } from "@/pages/Merchandise";
import { create } from "zustand";

type ShoppingCart = {
  requestLoading: boolean;
  cartItems: MerchandiseSchema[];
  totalPrice: number;
  addToCart: (item: MerchandiseSchema) => void;
  removeFromCart: (item: MerchandiseSchema) => void;
  setRequestLoading: (isLoading: boolean) => void;
  calculateTotalPrice: () => void;
};

const useShoppingCart = create<ShoppingCart>((set) => ({
  requestLoading: false,
  cartItems: [],
  totalPrice: 0,
  addToCart: (item) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem._id === item._id);

      const totalPrice = state.totalPrice + item.price
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].quantity += 1;
        return { cartItems: updatedItems, totalPrice };
      }

      return { cartItems: [...state.cartItems, { ...item, quantity: 1 }], totalPrice };
    });
  },
  removeFromCart: (item) => {
    set((state) => {
      const totalPrice = state.totalPrice - (item.price * item.quantity);
      return { cartItems: state.cartItems.filter(cartItem => item._id !== cartItem._id), totalPrice }
    })
  },
  setRequestLoading: (isLoading) => set((state) => ({ ...state, requestLoading: isLoading })),
  calculateTotalPrice: () => set((state) => ({
    totalPrice: state.cartItems.reduce((total,value) => total += value.price * value.quantity, 0)
  }))
}));

export default useShoppingCart;
