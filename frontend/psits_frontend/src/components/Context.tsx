import { createContext, useContext, useState, ReactNode, FC } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  photo_img_link: string;
  size: string;
  color: string;
  quantity: number;
}

interface ContextType {
  cartItems: Record<number, CartItem>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      if (prevItems[item.id]) {
        // Item already exists in the cart, increase the quantity
        return {
          ...prevItems,
          [item.id]: {
            ...prevItems[item.id],
            quantity: prevItems[item.id].quantity + 1,
          },
        };
      } else {
        // Item doesn't exist in the cart, add it with quantity 1
        return {
          ...prevItems,
          [item.id]: { ...item, quantity: 1 },
        };
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[id];
      return updatedItems;
    });
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[id].quantity > 1) updatedItems[id].quantity -= 1;
      return updatedItems;
    });
  };

  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[id].quantity += 1;
      return updatedItems;
    });
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.values(cartItems).forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        decreaseQuantity,
        increaseQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useShoppingCart = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useShoppingCart must be used within a ContextProvider");
  }
  return context;
};
