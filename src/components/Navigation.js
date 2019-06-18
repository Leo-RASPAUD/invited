import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import contextUser from '../UserContext';

const Navigation = styled.div`
  background: whitesmoke;
  margin: -16px -32px 0 -32px;
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const Ul = styled.ul`
  display: flex;
`;

const Logo = styled.div`
  font-size: 32px;
  cursor: default;
  user-select: none;
  flex: 1;
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
      <Logo>Invite</Logo>
      {userContext.isLoaded && userContext.user && (
        <Ul>
          <li>
            <Link to="/app">Event list</Link>
          </li>
          <li>
            <button onClick={signOut}>Signout</button>
          </li>
        </Ul>
      )}
      {userContext.isLoaded && !userContext.user && (
        <Ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </Ul>
      )}
    </Navigation>
  );
};

export default withRouter(NavigationComponent);
