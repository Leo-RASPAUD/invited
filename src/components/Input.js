import React from 'react';
import styles from './Input.module.scss';
import Error from './Error';

export default ({ required, register, label, name, type, errors, errorMessage, defaultChecked }) => {
  return (
    <div className={styles['input']}>
      <label className={styles['input-label']} htmlFor="name">
        {label}
      </label>
      <input
        className={styles['input-input']}
        defaultChecked={defaultChecked}
        name={name}
        type={type}
        ref={register({
          required,
        })}
      />
      {errors[name] && <Error errorMessage={errorMessage || `${label} is required`} />}
    </div>
  );
};
