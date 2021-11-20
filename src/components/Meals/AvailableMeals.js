import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import { DUMMY_MEALS } from "./dummyMeals";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
    const { isLoading, request, error } = useHttp();
    const [fetchedMeals, setFetchedMeals] = useState([]);

    
    useEffect(() => {
        const appliedMethod = (data) => {
            const meals = Object.values(data);
            setFetchedMeals(meals)
        }
        request({url: 'https://reactmeal-8def3-default-rtdb.firebaseio.com/Meals.json'}, appliedMethod);
    }, [])

    let MealsList;
    if(isLoading) {
        MealsList = <p>Loading...</p>
    }
    else if(error) {
        MealsList = <p>{error}</p>
    }
    else {
        MealsList = fetchedMeals.map((meal) => {
            return <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} id={meal.id}/>
        })
    }
    return <section className={classes.meals}>
        <Card>
            <ul>
                {MealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;