import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
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

export default () => {
  const userContext = useContext(contextUser);
  const signOut = () => {
    Auth.signOut({ global: true })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <Navigation className="Navigation">
      <Logo>Invite</Logo>
      <Ul>
        <li>
          <Link to="/app">Event list</Link>
        </li>
        {userContext.isLoaded && userContext.user && (
          <li>
            <button onClick={signOut}>Signout</button>
          </li>
        )}
      </Ul>
    </Navigation>
  );
};
