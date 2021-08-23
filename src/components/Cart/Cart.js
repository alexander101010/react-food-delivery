import React, { useContext, useState } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal/Modal';
import CartDeliveryForm from './CartDeliveryForm';

import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // *****************************************
  // ORDER FORM - NAME AND ADDRESS ***********
  // *****************************************
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  const showDeliveryFormHandler = (e) => {
    if (hasItems) {
      setShowDeliveryForm(true);
    }
  };

  const orderActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={showDeliveryFormHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!showDeliveryForm && orderActions}
      {showDeliveryForm && <CartDeliveryForm onClose={props.onClose} />}
    </Modal>
  );
};

export default Cart;
