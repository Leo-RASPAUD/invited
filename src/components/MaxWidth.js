import React from 'react';
import styles from './MaxWidth.module.scss';

function MaxWidth({ children, theme }) {
  return <div className={styles['max-width']}>{children}</div>;
}

export default MaxWidth;
