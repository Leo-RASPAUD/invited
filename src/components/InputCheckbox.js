import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
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
  return (
    <div className={styles['input']}>
      <input
        className={styles['input-input']}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={name}
        name={name}
        type={type}
        ref={register({
          required,
        })}
      />
      <label className={styles['input-label']} htmlFor={name}>
        <span>{label}</span>
        <MdCheckBox className={styles['input-checked']} />
        <MdCheckBoxOutlineBlank className={styles['input-unchecked']} />
      </label>
      {errors[name] && <Error errorMessage={errorMessage || `${label} is required`} />}
    </div>
  );
};
