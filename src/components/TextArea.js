import React from 'react';
import styles from './TextArea.module.scss';
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
    <div className={styles['textarea']}>
      <label className={styles['textarea-label']} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={styles['textarea-textarea']}
        defaultValue={defaultValue}
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        ref={register({
          required,
        })}
      />
      {errors[name] && <Error errorMessage="This is required." />}
    </div>
  );
};
