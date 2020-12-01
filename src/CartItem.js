import React, { useEffect, useState } from 'react';

import './CartItem.css';
import { useGlobalContext } from './context/shopContext';

const CartItem = (props) => {
  const { id, title, price, img, amount } = props;
  const [showItem, setShowItem] = useState(true);
  const { dispatch, changeAmount } = useGlobalContext();

  useEffect(() => {
    if (amount < 1) setShowItem(false);
  }, [amount]);

  return (
    <article className={`cart-item ${showItem && 'show'}`}>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button
          className="remove-btn"
          onClick={() =>
            dispatch({
              type: 'REMOVE_ITEM',
              payload: { rId: id, rAmount: amount, rPrice: price },
            })
          }
        >
          remove
        </button>
      </div>
      <div>
        <button className="amount-btn" onClick={() => changeAmount(id, 'inc')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
          </svg>
        </button>
        <p className="amount">{amount}</p>
        <button className="amount-btn" onClick={() => changeAmount(id, 'dec')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default CartItem;
