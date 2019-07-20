import React from 'react';
import styles from './Paragraph.module.scss';

export default ({ children }) => {
  return <p className={styles['paragraph']}>{children}</p>;
};
