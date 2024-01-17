import React, { createContext, useContext, useReducer } from 'react';

// Initial cart state
const initialState = {
  items: [],
};

// Define the cart context
const CartContext = createContext();

// Define the cart reducer
const cartReducer = (state, action) => {
    switch (action.type) {
      // ... (your existing cases)
  
      case 'INCREASE_AMOUNT':
        return {
          ...state,
          items: state.items.map(item => 
            item.prodID === action.payload.prodID
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
  
        case 'DECREASE_AMOUNT':
      return {
        ...state,
        items: state.items.map(item =>
          item.prodID === action.payload.prodID
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'ADD_TO_CART':
        const existingItemIndex = state.items.findIndex(item => item.prodID === action.payload.prodID);

        if (existingItemIndex !== -1) {
            // If the item already exists in the cart, update its quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += 1;

            return { ...state, items: updatedItems };
        } else {
            // If the item is not in the cart, add it with a quantity of 1
            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
        }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [], // Set the items array to an empty array to clear the cart
      };
  
      default:
        return state;
    }
  };
  

// Cart context provider
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
