import React from 'react';

import styles from './IconText.module.scss';

const IconText = ({ children, icon: Icon = () => null }) => (
  <span className={styles['icon-text']}>
    <span className={styles['icon-text-icon']}>
      <Icon />
    </span>
    <span className={styles['icon-text-text']}>{children}</span>
  </span>
);

export default IconText;
