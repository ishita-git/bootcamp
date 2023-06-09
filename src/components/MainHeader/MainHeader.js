import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import Button from '../UI/Button/Button';

const MainHeader = (props) => {
  return (
    <>
    <header className={classes['main-header']}>
      <h1>Notes App</h1>
      
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </header>
    
    </>
  );
};

export default MainHeader;
