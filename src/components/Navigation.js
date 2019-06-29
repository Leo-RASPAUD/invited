import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import ButtonIcon from './ButtonIcon';
import { withRouter } from 'react-router-dom';
import contextUser from '../UserContext';
import { MdLock } from 'react-icons/md';

import styles from './Navigation.module.scss';

const activeStyle = {
  background: 'rgba(0,0,0, 0.1)',
};

const NavigationComponent = ({ history }) => {
  const userContext = useContext(contextUser);
  const signOut = () => {
    Auth.signOut({ global: true })
      .then(data => {
        history.push('/app');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={styles['navigation']}>
      {userContext.isLoaded && userContext.user && (
        <ul className={styles['list']}>
          <li>
            <NavLink activeStyle={activeStyle} exact to="/app">
              Event list
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} exact to="/app/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <ButtonIcon onClick={signOut} Icon={MdLock} label="Signout" />
          </li>
        </ul>
      )}
      {userContext.isLoaded && !userContext.user && (
        <ul className={styles['list']}>
          <li>
            <NavLink
              activeStyle={{
                background: 'rgba(255,255,255, 0.1)',
              }}
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default withRouter(NavigationComponent);
