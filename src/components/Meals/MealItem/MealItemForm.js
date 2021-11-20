import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();
        const enteredRef = amountInputRef.current.value;
        const enteredAmountNumber = +enteredRef;
        if(enteredRef.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return 
        }
        props.onAddToCart(enteredAmountNumber);
    };
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input label="Amount" input={{
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
            id: `amount_${props.id}`,
        }} ref={amountInputRef}/>
        <button>+ Add </button>
        {!amountIsValid && <p>Please enter a valid amount.</p>}
    </form>
}
export default MealItemForm;
