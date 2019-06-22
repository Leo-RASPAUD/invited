import React from 'react';
import Error from './Error';

import styles from './Select.module.scss';

export default props => {
  console.log(props);
  const { label, required, children, errors, name, errorMessage, register } = props;
  return (
    <div className={styles['select']}>
      <label className={styles['select-label']}>{label}</label>
      <div className={styles['select-control']}>
        <select
          className={styles['select-select']}
          name={name}
          ref={register({
            required,
          })}
        >
          {children}
        </select>
      </div>
      {errors[name] && <Error errorMessage={errorMessage || `${label} is required`} />}
    </div>
  );
};
