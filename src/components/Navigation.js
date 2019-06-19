import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import contextUser from '../UserContext';

const Navigation = styled.div`
  padding: 16px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  > li {
    margin: 4px 0;
    padding: 0;
  }

  > li > a,
  > li > button {
    color: white;
    display: block;
    padding: 4px 8px;
    text-decoration: none;
  }
`;

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
    <Navigation className="Navigation">
      {userContext.isLoaded && userContext.user && (
        <List>
          <li>
            <NavLink activeStyle={{
              background: 'rgba(255,255,255, 0.1)'
            }} to="/app"
            >
              Event list
            </NavLink>
          </li>
          <li>
            <button onClick={signOut}>Signout</button>
          </li>
        </List>
      )}
      {userContext.isLoaded && !userContext.user && (
        <List>
          <li>
            <NavLink activeStyle={{
              background: 'rgba(255,255,255, 0.1)'
            }} to="/login"
            >
              Login
            </NavLink>
          </li>
        </List>
      )}
    </Navigation>
  );
};

export default withRouter(NavigationComponent);
