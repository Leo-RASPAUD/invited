import React from 'react';
import styles from './Tools.module.scss';

function Tools({ children }) {
  return <div className={styles['tools']}>{children}</div>;
}

export default Tools;
