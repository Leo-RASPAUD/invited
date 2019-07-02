import React from 'react';
import styles from './Input.module.scss';
import Error from './Error';

export default ({
  required,
  register = () => {},
  label,
  name,
  type,
  errors,
  errorMessage,
  defaultValue,
  disabled = false,
  row = true,
}) => {
  return (
    <div className={`${styles['input']} ${row ? styles['is-row'] : styles['is-column']}`}>
      <label className={styles['input-label']} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles['input-input']}
        defaultValue={defaultValue}
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        ref={register({
          required,
        })}
      />
      {errors[name] && <Error errorMessage={errorMessage || `${label} is required`} />}
    </div>
  );
};
