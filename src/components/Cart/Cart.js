import React, { useContext, useState } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal/Modal';
import CartDeliveryForm from './CartDeliveryForm';

import CartContext from '../../store/cart-context';
import { REQUEST_URL } from '../../js/config';

import classes from './Cart.module.css';

const Cart = (props) => {
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

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

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${REQUEST_URL}/orders.json`, {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      });
      if (response.ok) {
        setIsSubmitting(false);
        setDidSubmit(true);
      }
    } catch (err) {
      console.log(err);
    }
    cartCtx.clearCart();
  };

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

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!showDeliveryForm && orderActions}
      {showDeliveryForm && (
        <CartDeliveryForm
          onClose={props.onClose}
          onConfirm={submitOrderHandler}
        />
      )}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Thank you, your order was received!</p>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
