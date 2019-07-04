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

const NavigationComponent = ({ history }) => {
  const { updateCurrentUser, isLoaded, user } = useContext(contextUser);
  const signOut = () => {
    Auth.signOut({ global: true })
      .then(async data => {
        await updateCurrentUser(null);
        history.push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    window.location.pathname !== '/googleSignIn' && (
      <div className={styles['navigation']}>
        {isLoaded && user && (
          <ul className={styles['list']}>
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
              <Button onClick={signOut}>Signout</Button>
            </li>
          </ul>
        )}
        {isLoaded && !user && (
          <ul className={styles['list']}>
            <li>
              <NavLink activeStyle={activeStyle} to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} to="/signup">
                Signup
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    )
  );
};

export default withRouter(NavigationComponent);
