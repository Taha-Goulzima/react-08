import { useState } from 'react';
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import { CartContext } from './store/ShoppingCart.jsx';

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  // Function to handle adding items to the cart
  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
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
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return { items: updatedItems };
    });
  }

  // Function to update item quantity in the cart
  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      if (updatedItemIndex !== -1) {
        const updatedItem = { ...updatedItems[updatedItemIndex] };
        updatedItem.quantity += amount;

        if (updatedItem.quantity <= 0) {
          // Remove item if quantity is zero or less
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }
      }

      return { items: updatedItems };
    });
  }
const ctxValue = {
  items: shoppingCart.items,
  addItemToCart : handleAddItemToCart
}
  return (
    <CartContext.Provider value={ctxValue}>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={handleAddItemToCart} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;
 