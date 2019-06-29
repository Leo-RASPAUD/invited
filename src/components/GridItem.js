import React from 'react';
import styles from './GridItem.module.scss';

function GridItem({ children, theme }) {
  return <div className={styles['grid-item']}>{children}</div>;
}

export default GridItem;
