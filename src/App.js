import React, { useState, useEffect } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

import useHttp from './hooks/use-http';
import { REQUEST_URL } from './config';

function App() {
  // *************************************************
  //***********Show Cart Modal Logic *****************
  // *************************************************

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  // *************************************************
  // *** HTTP Request to load meals ******************
  // *************************************************

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

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals
          items={meals}
          loading={isLoading}
          error={error}
          onFetch={fetchMeals}
        />
      </main>
    </CartProvider>
  );
}

export default App;
