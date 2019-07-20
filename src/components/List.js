import React from 'react';
import uuid from 'uuid/v4';
import styles from './List.module.scss';

export default ({ children = [] }) => {
  return (
    <ul className={styles['list']}>
      {children.map((item, index) => (
        <li index={uuid()} className={styles['list-item']}>
          <span className={styles['list-item-number']} role="presentation">
            {index + 1}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
};
