import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = styled.div`
  background: #fefefe;
  border-bottom: 1px solid coral;
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
  return (
    <Navigation className="Navigation">
      <Logo>Invite.me</Logo>
      <Ul>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </Ul>
    </Navigation>
  );
};
