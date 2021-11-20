import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const { isLoading, request, error } = useHttp();
  const [isCheckout, setisCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          {...item}
          key={item.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderButtonHandler = () => {
    setisCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    const orderData = {
      user: userData,
      order: cartCtx.items,
      totalAmount: totalAmount,
    };
    request(
      {
        url: "https://reactmeal-8def3-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        header: {
          content: "application/json",
        },
        body: orderData,
      },
      () => {
        setOrderConfirmed(true);
        cartCtx.resetCart();
        setTimeout(() => {
            props.onHideCart();
        },2000)
      }
    );
  };

  if (isLoading) {
    return (<Modal onClose={props.onHideCart}>
    <p>Order In progresss</p>
    </Modal>)
  }

  if (orderConfirmed) {
    return (<Modal onClose={props.onHideCart}>
        <p>Order Confirmed</p>
        </Modal>)
  }

  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          cancelButtonHandler={props.onHideCart}
          submitOrderHandler={submitOrderHandler}
        />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button-alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button
              className={classes.button}
              disabled={!hasItems}
              onClick={orderButtonHandler}
            >
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
