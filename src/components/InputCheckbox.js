import React from 'react';
import styles from './InputCheckbox.module.scss';
import Error from './Error';

export default ({
  required,
  register = () => {},
  label,
  name,
  type,
  errors,
  errorMessage,
  defaultChecked,
  disabled = false,
}) => {
  const regexLabel = label.replace(/[^\w\d]/g, '');
  console.log(regexLabel);
  return (
    <div className={styles['input']}>
      <input
        className={styles['input-input']}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={regexLabel}
        name={name}
        type={type}
        ref={register({
          required,
        })}
      />
      <label className={styles['input-label']} htmlFor={regexLabel}>
        <span>{label}</span>
        <svg className={styles['input-checked']} viewBox="0 0 20 20">
          <path fill="transparent" stroke="currentColor" strokeWidth={2} d="M6,10.5 L9,13 L14,6.5" />
        </svg>
        <svg className={styles['input-unchecked']} viewBox="0 0 20 20">
          <path fill="transparent" stroke="currentColor" strokeWidth={2} d="M1,1 L19,1 L19,19 L 1,19z" />
        </svg>
      </label>
      {errors[name] && <Error errorMessage={errorMessage || `${label} is required.`} />}
    </div>
  );
};
