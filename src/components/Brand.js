import React from 'react';
import { Link } from 'react-router-dom';
import { MdImage } from 'react-icons/md';
import styles from './Brand.module.scss';

export default ({ children, ...props }) => {
  return (
    <Link className={styles['brand']} {...props}>
      <span className={styles['brand-icon']}>
        <MdImage />
      </span>
      <span className={styles['brand-text']}>{children}</span>
    </Link>
  );
};
