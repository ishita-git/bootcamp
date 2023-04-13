import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
    
        return(
          <nav className={classes.nav}>
          <ul>
            {ctx.isLoggedIn && (
              <li>
                <a href="/profile">Profile</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <a href="/publicnotes">Public Notes</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <a href="/createnotes">Create Note</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <button onClick={ctx.onLogout}>Logout</button>
              </li>
            )}
            
          </ul>
        </nav>
 
        )
    
            }      
   
  

export default Navigation;
