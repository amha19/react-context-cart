import React from 'react';

import CartItem from './CartItem';
import './CartContainer.css';
import { useGlobalContext } from './context/shopContext';

const CartContainer = () => {
  const {
    state: { mobiles, totalPrice },
    dispatch,
  } = useGlobalContext();

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {mobiles.map((mobile, index) => {
          return <CartItem key={index} {...mobile} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${totalPrice.toFixed(2)}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={() => dispatch({ type: 'CLEAR_ALL' })}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
