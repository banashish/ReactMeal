import CartContext from "./cart-context";
import { useReducer } from "react";

const cartReducer = (state, action) => {
    if(action.type === "ADD_TO_CART") {
        const newTotalAmount = state.totalAmount + action.value.price * action.value.amount;
        const existingItemIndex = state.items.findIndex(item => item.id === action.value.id);
        const existingItem = state.items[existingItemIndex];
        let updatedItems;
        if(existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.value.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.value);
        }
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    else if (action.type === "REMOVE_FROM_CART") {
        const existingItemIndex = state.items.findIndex(item => item.id === action.value);
        const existingItem = state.items[existingItemIndex];
        const newTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => (item.id !== action.value));
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    else {
        return defaultCartState
    }
};

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const CartProvider = props => {
    const [cartState, dispatchCartAction]= useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = item => {
        dispatchCartAction({
            type: "ADD_TO_CART",
            value: item
        })
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({
            type: "REMOVE_FROM_CART",
            value: id
        })
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;