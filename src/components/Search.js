import React from 'react';
import styles from './Search.module.scss';

export default ({ register, name, placeholder = 'Search' }) => {
  return (
    <div className={styles['search']}>
      <label className={styles['search-label']} htmlFor={name}>
        Search
      </label>
      <input
        className={styles['search-input']}
        id={name}
        name={name}
        placeholder={placeholder}
        type="text"
        ref={register}
      />
    </div>
  );
};
