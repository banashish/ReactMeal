import React from "react";
import classes from "./AvailableMeals.module.css";
import { DUMMY_MEALS } from "./dummyMeals";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const MealsList = DUMMY_MEALS.map((meal) => (
        <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} id={meal.id}/>
    ))
    return <section className={classes.meals}>
        <Card>
            <ul>
                {MealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;