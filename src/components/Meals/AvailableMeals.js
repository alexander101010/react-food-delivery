import React, { useEffect, useState } from 'react';

import MealItem from './MealItem/MealItem';
import Card from '../UI/Card/Card';

import useHttp from '../../hooks/use-http';
import { REQUEST_URL } from '../../config';

import classes from './AvailableMeals.module.css';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  useEffect(() => {
    const transformMeals = (mealsObj) => {
      const loadedMeals = [];

      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealKey,
          description: mealsObj[mealKey].description,
          price: mealsObj[mealKey].price,
          name: mealsObj[mealKey].name,
        });
      }
      setMeals(loadedMeals);
    };

    // fetchMeals (renamed from sendRequest, wants requestConfig object and applyData function)
    fetchMeals(
      {
        url: REQUEST_URL,
      },
      transformMeals
    );
  }, [fetchMeals]); // because this is a function as a dependency we need to wrap function in useCallback in custom hook to prevent infinite loop of rerendering

  const mealsList = meals.map((meal) => {
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
