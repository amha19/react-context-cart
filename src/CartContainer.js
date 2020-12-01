import React from 'react';

import CartItem from './CartItem';
import './CartContainer.css';
import { useGlobalContext } from './context/shopContext';

const CartContainer = () => {
  const { mobiles, totalPrice, isLoading, dispatch } = useGlobalContext();

  if (isLoading)
    return (
      <section className="cart">
        <h2>Loading...</h2>
      </section>
    );

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {totalPrice > 0 ? (
          mobiles.map((mobile, index) => {
            return <CartItem key={index} {...mobile} />;
          })
        ) : (
          <div className="empty-cart">nothing in your bag</div>
        )}
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
