import React from 'react';

import MealItem from './MealItem/MealItem';
import Card from '../UI/Card/Card';

import { DUMMY_MEALS } from './dummy-meals';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
