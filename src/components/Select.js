import React from 'react';
import Error from './Error';

import styles from './Select.module.scss';

export default props => {
  const { label, required, children, errors, name, register, defaultValue } = props;
  return (
    <div className={styles['select']}>
      <label className={styles['select-label']}>{label}</label>
      <div className={styles['select-control']}>
        <select
          className={styles['select-select']}
          name={name}
          defaultValue={defaultValue}
          ref={register({
            required,
          })}
        >
          {children}
        </select>
        <svg className={styles['select-icon']} viewBox="0 0 20 20">
          <path fill="transparent" stroke="currentColor" strokeWidth={2} d="M4,8 L10,14 L16,8" />
        </svg>
      </div>
      {errors[name] && <Error errorMessage="This is required" />}
    </div>
  );
};
