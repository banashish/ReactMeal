import React, { useContext, useEffect, useState} from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const cartContext = useContext(CartContext);
    const { items } = cartContext;
    const numberOfCartItems = cartContext.items.reduce((curNumber, item) => {return curNumber + item.amount}, 0);
    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false)
        },300)

        return () => {
            clearTimeout(timer);
        }
    }, [items])
    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`
    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span> Your Cart </span>
        <span className={classes.badge}> {numberOfCartItems} </span>
    </button>
}

export default HeaderCartButton; 