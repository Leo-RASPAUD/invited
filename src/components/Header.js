import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.header`
  background: whitesmoke;
  display: flex;
  position: relative;
`;

const Brand = styled.div`
  margin: 0 auto 0 0;

  > a {
    color: dimgrey;
    display: block;
    padding: 16px;
    text-decoration: none;
  }
`;

const Children = styled.div`
  position: relative;
`;

function Header({ children, theme }) {
  return (
    <Container>
      <Brand>
        <Link to="/">Inviting</Link>
      </Brand>
      <Children>{children}</Children>
    </Container>
  );
}

export default Header;
