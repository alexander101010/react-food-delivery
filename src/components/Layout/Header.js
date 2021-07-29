import { Fragment } from 'react';

import mealsImg from '../../assets/meals.jpeg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <button>Cart</button>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt='Table full of tasty bounty' />
      </div>
    </Fragment>
  );
};

export default Header;
