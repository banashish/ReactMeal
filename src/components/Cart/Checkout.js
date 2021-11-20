import React, {useCallback} from "react";
import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const isValidCallBack = useCallback(
    (input) => input.trim() !== ''
  )
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasErrors,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isValidCallBack);

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasErrors,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(isValidCallBack);

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasErrors,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(isValidCallBack);

  const {
    value: enteredPostalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasErrors,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: postalCodeReset,
  } = useInput(isValidCallBack);

  const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const confirmhandler = (event) => {
    event.preventDefault();
    if(!formIsValid) {
      return
    }
    const userData = {
      name: enteredName,
      street: enteredStreet,
      postal_code: enteredPostalCode,
      city: enteredCity
    };
    
    props.submitOrderHandler(userData);
  };
  return (
    <form className={classes.form} onSubmit={confirmhandler}>
      <div className={`${classes.control} ${nameHasErrors ? classes.invalid : ''}`}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          type="text"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameHasErrors && <p>Please enter a valid name.</p>}
      </div>
      <div className={`${classes.control} ${streetHasErrors ? classes.invalid : ''}`}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {streetHasErrors && <p>Please enter a valid street.</p>}
      </div>
      <div className={`${classes.control} ${postalCodeHasErrors ? classes.invalid : ''}`}>
        <label htmlFor="postalcode">Postal code</label>
        <input
          id="postalcode"
          type="text"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
          />
          {postalCodeHasErrors && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={`${classes.control} ${cityHasErrors ? classes.invalid : ''}`}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {cityHasErrors && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.cancelButtonHandler}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
