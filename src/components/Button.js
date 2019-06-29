import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

export default ({ children, ...props }) => {
  if (props.to) {
    return (
      <Link className={styles['button']} {...props}>
        {children}
      </Link>
    );
  }
  if (props.href) {
    return (
      <a className={styles['button']} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={styles['button']} {...props}>
      {children}
    </button>
  );
};

export const Buttons = props => <div className={styles.buttons}>{props.children}</div>;
