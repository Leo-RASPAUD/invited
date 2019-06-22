import React from 'react';
import Error from './Error';

export default ({ required, register, label, name, type, errors, errorMessage, defaultChecked }) => {
  return (
    <>
      <label htmlFor="name">{label}</label>
      <input
        defaultChecked={defaultChecked}
        name={name}
        type={type}
        ref={register({
          required,
        })}
      />
      {errors[name] && <Error errorMessage={errorMessage || `${label} is required`} />}
    </>
  );
};
