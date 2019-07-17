import React from 'react';
import styles from './Input.module.scss';
import Error from './Error';
import Guidance from './Guidance';

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
  guidance = '',
}) => {
  return (
    <div className={styles['input']}>
      <label className={styles['input-label']} htmlFor={name}>
        {label}
      </label>
      <Guidance content={guidance} />
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
      {errors[name] && <Error errorMessage={errorMessage || `${label} is required.`} />}
    </div>
  );
};
