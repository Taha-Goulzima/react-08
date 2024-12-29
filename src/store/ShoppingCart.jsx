import { createContext, useState, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

// Create CartContext with an initial empty state
export const CartContext = createContext({
  items: [],
  addItemToCart: () => { },
  updateItemQuantity: () => { },
});
function shoppingCartReducer(state, action) {
  if(action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );

    if (existingCartItemIndex !== -1) {
      // Update quantity if item already exists
      const updatedItem = {
        ...updatedItems[existingCartItemIndex],
        quantity: updatedItems[existingCartItemIndex].quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // Add new item if it doesn't exist
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return { 
      ...state,// not needed here because we have only one value
      items: updatedItems ,
    };

  }else if(action.type === 'UPDATE_ITEM'){
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );
  
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...updatedItems[updatedItemIndex] };
      updatedItem.quantity +=  action.payload.amount;
  
      if (updatedItem.quantity <= 0) {
        // Remove item if quantity is zero or less
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }
    }
  
    return { 
      ...state,
      items: updatedItems 
    };
  }
  return state
}



export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
    items: [], 
  });
 

  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  // Function to handle add ing items to the cart
  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type:'ADD_ITEM',
      payload: id,
    });



  }

  // Function to update item quantity in the cart
  function handleUpdateCartItemQuantity(productId, amount) {
   shoppingCartDispatch({
      type:'UPDATE_ITEM',
      payload: {productId, amount},
    });

  }
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity
  };
  return <CartContext.Provider value={ctxValue}>
    {children}
  </CartContext.Provider>
}