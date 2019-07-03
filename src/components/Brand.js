import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Brand.module.scss';

export default ({ children, ...props }) => {
  const size = 90;
  return (
    <Link className={styles['brand']} {...props}>
      <span className={styles['brand-shape']}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle r={(size - 2) / 2} cy={size / 2} cx={size / 2} fill="#ffef6b" />
        </svg>
      </span>
      <span className={styles['brand-text']}>{children}</span>
    </Link>
  );
};
