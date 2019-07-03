import React from 'react';
import Error from './Error';

import styles from './Select.module.scss';

export default props => {
  const { label, required, children, errors, name, errorMessage, register } = props;
  return (
    <div className={styles['select']}>
      <label className={styles['select-label']}>{label}</label>
      <select
        className={styles['select-select']}
        name={name}
        ref={register({
          required,
        })}
      >
        {children}
      </select>
      {errors[name] && <Error errorMessage={errorMessage || `${label} is required`} />}
    </div>
  );
};
