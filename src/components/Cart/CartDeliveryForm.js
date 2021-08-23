import React, { useState } from 'react';

import useInput from '../../hooks/use-input';
import { validFullName, validString } from '../../js/helpers';
import classes from './CartDeliveryForm.module.css';

const CartDeliveryForm = (props) => {
  const [showForm, setShowForm] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    value: enteredName,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    isValid: nameIsValid,
    reset: resetName,
  } = useInput(validFullName);

  const {
    value: enteredAddress,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    isValid: addressIsValid,
    reset: resetAddress,
  } = useInput(validString);

  const {
    value: enteredZipcode,
    hasError: zipcodeHasError,
    valueChangeHandler: zipcodeChangeHandler,
    inputBlurHandler: zipcodeBlurHandler,
    isValid: zipcodeIsValid,
    reset: resetZipcode,
  } = useInput(validString);

  const {
    value: enteredCity,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    isValid: cityIsValid,
    reset: resetCity,
  } = useInput(validString);

  //FORM VALIDATION
  let formIsValid;
  if (nameIsValid && addressIsValid && zipcodeIsValid && cityIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const resetInputs = () => {
    resetName();
    resetAddress();
    resetZipcode();
    resetCity();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    console.log(enteredName, enteredAddress);
    // make POST request with this info and order
    resetInputs();
    setShowForm(false);
    setShowConfirmation(true);
  };

  const nameClasses = `form-control${nameHasError ? ' invalid' : ''}`;
  const addressClasses = `form-control${addressHasError ? ' invalid' : ''}`;
  const zipcodeClasses = `form-control${zipcodeHasError ? ' invalid' : ''}`;
  const cityClasses = `form-control${cityHasError ? ' invalid' : ''}`;

  const deliveryForm = (
    <form onSubmit={submitHandler}>
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
        <div className={zipcodeClasses}>
          <label htmlFor='zipcode'>Zipcode</label>
          <input
            type='text'
            id='zipcode'
            value={enteredZipcode}
            onChange={zipcodeChangeHandler}
            onBlur={zipcodeBlurHandler}
          />
          {zipcodeHasError && (
            <p className={classes['error-text']}>
              Please enter your full zipcode!
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
  return (
    <React.Fragment>
      {showForm && deliveryForm}
      {showConfirmation && <p>Thank you! Your order has been received.</p>}
    </React.Fragment>
  );
};

export default CartDeliveryForm;
