import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
    padding: 4px;
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
            <Link to="/app">Event list</Link>
          </li>
          <li>
            <button onClick={signOut}>Signout</button>
          </li>
        </List>
      )}
      {userContext.isLoaded && !userContext.user && (
        <List>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </List>
      )}
    </Navigation>
  );
};

export default withRouter(NavigationComponent);
