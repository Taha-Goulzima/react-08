import { useRef, useContext } from 'react';

import CartModal from './CartModal.jsx';
import { CartContext } from '../store/ShoppingCart.jsx';

export default function Header() {
  const { items } = useContext(CartContext);
  const modal = useRef();

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }
  function handleCloseCartClick() {
    modal.current.close(); // Close modal when "Close" button is clicked
  }


  let modalActions = (
    <button onClick={handleCloseCartClick}>Close</button>
  );
  
  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button onClick={handleCloseCartClick}>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
