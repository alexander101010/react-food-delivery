import React, { Fragment } from 'react';

import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';

const Meals = (props) => {
  const { items: meals, loading, error, onFetch: fetchMeals } = props;

  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals meals={props.items} />
    </Fragment>
  );
};

export default Meals;
