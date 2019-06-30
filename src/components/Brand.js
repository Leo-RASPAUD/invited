import React from 'react';
import { Link } from 'react-router-dom';
import { MdEvent } from 'react-icons/md';
import styles from './Brand.module.scss';

export default ({ children, ...props }) => {
  return (
    <Link className={styles['brand']} {...props}>
      <span className={styles['brand-icon']}>
        <MdEvent />
      </span>
      <span className={styles['brand-text']}>{children}</span>
    </Link>
  );
};
