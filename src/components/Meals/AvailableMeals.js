import React, { useEffect, useState } from 'react';

import MealItem from './MealItem/MealItem';
import Card from '../UI/Card/Card';

import useHttp from '../../hooks/use-http';
import { REQUEST_URL } from '../../js/config';

import classes from './AvailableMeals.module.css';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error: httpError, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealsObj) => {
      const loadedMeals = [];

      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealsObj[mealKey].name,
          description: mealsObj[mealKey].description,
          price: mealsObj[mealKey].price,
        });
      }
      setMeals(loadedMeals);
    };

    // fetchMeals (renamed sendRequest, wants requestConfig obj & applyData fn)
    fetchMeals(
      {
        url: REQUEST_URL,
      },
      transformMeals
    );
  }, [fetchMeals]); // bc this is a fn as a dependency we need to wrap fn in useCallback in custom hook to prevent infinite loop of rerendering

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

  let content = isLoading ? (
    <div>
      <p>Meal options are loading!</p>
    </div>
  ) : (
    <ul>{mealsList}</ul>
  );

  if (httpError) {
    content = (
      <p className={classes['http-error-text']}>
        Something went wrong 🙃 ({httpError})
      </p>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
