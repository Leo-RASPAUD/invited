import React from 'react';
import styles from './ButtonIcon.module.scss';

export default ({ Icon, label, onClick }) => {
  return (
    <button onClick={onClick}>
      <span className={styles['container']}>
        <Icon className={styles['icon']} />
        {label}
      </span>
    </button>
  );
};
