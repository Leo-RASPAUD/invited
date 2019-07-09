import React from 'react';
import { withRouter } from 'react-router-dom';
import Brand from './Brand';
import styles from './Header.module.scss';

function Header({
  history: {
    location: { pathname },
  },
  children,
}) {
  if (pathname.indexOf('/event/') > -1 && pathname.indexOf('/app') === -1) return null;

  return (
    <header className={styles['header']}>
      <Brand to="/">Invited</Brand>
      <div className={styles['header-children']}>{children}</div>
    </header>
  );
}

export default withRouter(Header);
