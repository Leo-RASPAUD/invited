import React from 'react';
import styles from './Tool.module.scss';

function Tool({ children }) {
  return <div className={styles['tool']}>{children}</div>;
}

export default Tool;
