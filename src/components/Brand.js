import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  brand: {
    color: 'inherit',
    display: 'block',
    fontSize: 24,
    lineHeight: '36px',
    textDecoration: 'none',
  },
};

export default ({ children, ...props }) => {
  return (
    <Link style={styles['brand']} {...props}>
      Invited
    </Link>
  );
};
