import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Button from './Button';
import { withRouter } from 'react-router-dom';
import contextUser from '../UserContext';

import styles from './Navigation.module.scss';

const activeStyle = {
  border: '2px solid currentColor',
};

const NavigationComponent = ({
  history: {
    location: { pathname },
  },
  match,
}) => {
  const { isLoaded, user } = useContext(contextUser);
  const signOut = () => {
    Auth.signOut({ global: true }).catch(err => console.log(err));
  };

  return (
    pathname !== '/googleSignIn' && (
      <div className={styles['navigation']}>
        {isLoaded && user && (
          <ul className={styles['navigation-list']}>
            <li>
              <NavLink activeStyle={activeStyle} exact to="/app">
                Events
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} exact to="/app/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} exact to="/about">
                About
              </NavLink>
            </li>
            <li className={styles['navigation-signout']}>
              <Button onClick={signOut}>Signout</Button>
            </li>
          </ul>
        )}
        {isLoaded && !user && (
          <ul className={styles['navigation-list']}>
            <li>
              <NavLink activeStyle={activeStyle} to="/login">
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} to="/signup">
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} exact to="/about">
                About
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    )
  );
};

export default withRouter(NavigationComponent);
