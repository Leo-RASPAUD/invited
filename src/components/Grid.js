import React from 'react';
import styles from './Grid.module.scss';

function Grid({ children, theme }) {

  return <div className={styles['grid']}>{children}</div>;
}

export default Grid;
