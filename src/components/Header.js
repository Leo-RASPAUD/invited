import React from 'react';
import Brand from './Brand';
import styles from './Header.module.scss';

function Header({ children }) {
  return (
    <header className={styles['header']}>
      <Brand to="/">Invited</Brand>
      <div>{children}</div>
    </header>
  );
}

export default Header;
