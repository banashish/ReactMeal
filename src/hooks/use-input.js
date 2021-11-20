import React, { useState } from "react";

const useInput = (validationFunction) => {
    const [enteredvalue, setEnteredvalue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsvalid = validationFunction(enteredvalue);
    const hasError = !valueIsvalid && isTouched;

    const valueChangeHandler = (event) => {
        setEnteredvalue(event.target.value)
    }

    const inputBlurHandler = () => {
        setIsTouched(true);
        console.log(hasError);
    }

    const reset = () => {
        setIsTouched(false);
        enteredvalue('')
    }

    return {
        value: enteredvalue,
        isValid: valueIsvalid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput;