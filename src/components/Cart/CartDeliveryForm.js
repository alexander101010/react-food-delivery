import React, { useState } from 'react';

import useInput from '../../hooks/use-input';
// import useHttp from '../../hooks/use-http';
import { validFullName, validString, isFiveChars } from '../../js/helpers';
import classes from './CartDeliveryForm.module.css';

const CartDeliveryForm = (props) => {
  const [showForm, setShowForm] = useState(true);

  const {
    value: enteredName,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    isValid: nameIsValid,
  } = useInput(validFullName);

  const {
    value: enteredAddress,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    isValid: addressIsValid,
  } = useInput(validString);

  const {
    value: enteredZipCode,
    hasError: zipCodeHasError,
    valueChangeHandler: zipCodeChangeHandler,
    inputBlurHandler: zipCodeBlurHandler,
    isValid: zipCodeIsValid,
  } = useInput(isFiveChars);

  const {
    value: enteredCity,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    isValid: cityIsValid,
  } = useInput(validString);

  //FORM VALIDATION
  const formIsValid =
    nameIsValid && addressIsValid && zipCodeIsValid && cityIsValid;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    setShowForm(false);
    // pass data to Cart for submition, since Cart also has access to items in cart
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      zipCode: enteredZipCode,
    });
  };

  const nameClasses = `form-control${nameHasError ? ' invalid' : ''}`;
  const addressClasses = `form-control${addressHasError ? ' invalid' : ''}`;
  const zipCodeClasses = `form-control${zipCodeHasError ? ' invalid' : ''}`;
  const cityClasses = `form-control${cityHasError ? ' invalid' : ''}`;

  const deliveryForm = (
    <form onSubmit={submitHandler} className={classes['delivery-form']}>
      <div className={classes['control-group']}>
        <div className={nameClasses}>
          <label htmlFor='name'>Full Name</label>
          <input
            type='text'
            id='name'
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <p className={classes['error-text']}>
              Please enter your full name!
            </p>
          )}
        </div>
      </div>
      <div className={classes['control-group']}>
        <div className={addressClasses}>
          <label htmlFor='address'>Delivery Address</label>
          <input
            type='text'
            id='address'
            value={enteredAddress}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
          />
          {addressHasError && (
            <p className={classes['error-text']}>
              Please enter your full address!
            </p>
          )}
        </div>
      </div>
      <div className={classes['control-group']}>
        <div className={zipCodeClasses}>
          <label htmlFor='zipCode'>ZipCode</label>
          <input
            type='text'
            id='zipCode'
            value={enteredZipCode}
            onChange={zipCodeChangeHandler}
            onBlur={zipCodeBlurHandler}
          />
          {zipCodeHasError && (
            <p className={classes['error-text']}>
              Please enter valid zipCode (5 characters)!
            </p>
          )}
        </div>
      </div>
      <div className={classes['control-group']}>
        <div className={cityClasses}>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            id='city'
            value={enteredCity}
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
          />
          {cityHasError && (
            <p className={classes['error-text']}>Please enter your city!</p>
          )}
        </div>
      </div>

      <div className='form-actions'>
        <button
          type='button'
          className={classes['button--alt']}
          onClick={props.onClose}
        >
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes['button-order']}>
          Submit Order!
        </button>
      </div>
    </form>
  );
  return <React.Fragment>{showForm && deliveryForm}</React.Fragment>;
};

export default CartDeliveryForm;
