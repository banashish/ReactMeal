import React from "react";
import mealsImage from '../../assets/meals.jpg'
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    
    return <React.Fragment>
        <header className={classes.header}>
            <h1>ReactMeal</h1>
            <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="food image" />
        </div>
    </React.Fragment>
}

export default Header;