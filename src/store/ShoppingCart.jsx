import { createContext } from 'react';

// Create CartContext with an initial empty state
export const CartContext = createContext({
  items: [],
  addItemToCart:()=>{},
});
