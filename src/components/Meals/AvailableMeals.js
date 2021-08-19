import React from 'react';

import MealItem from './MealItem/MealItem';
import Card from '../UI/Card/Card';

import classes from './AvailableMeals.module.css';

const AvailableMeals = (props) => {
  const mealsList = props.meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
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
