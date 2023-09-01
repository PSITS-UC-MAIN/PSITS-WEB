import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const Context = createContext(undefined);
export const ContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item) => {
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
            }
            else {
                // Item doesn't exist in the cart, add it with quantity 1
                return {
                    ...prevItems,
                    [item.id]: { ...item, quantity: 1 },
                };
            }
        });
    };
    const removeFromCart = (id) => {
        setCartItems((prevItems) => {
            const updatedItems = { ...prevItems };
            delete updatedItems[id];
            return updatedItems;
        });
    };
    const decreaseQuantity = (id) => {
        setCartItems((prevItems) => {
            const updatedItems = { ...prevItems };
            if (updatedItems[id].quantity > 1)
                updatedItems[id].quantity -= 1;
            return updatedItems;
        });
    };
    const increaseQuantity = (id) => {
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
    return (_jsx(Context.Provider, { value: {
            cartItems,
            addToCart,
            removeFromCart,
            getTotalPrice,
            decreaseQuantity,
            increaseQuantity,
        }, children: children }));
};
export const useShoppingCart = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useShoppingCart must be used within a ContextProvider");
    }
    return context;
};
