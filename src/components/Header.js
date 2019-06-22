import React from 'react';
import Button from './Button'
import styles from './Header.module.scss';

function Header({ children }) {
  return (
    <header className={styles['header']}>
      <Button to="/">Invited</Button>
      <div>{children}</div>
    </header>
  );
}

export default Header;
