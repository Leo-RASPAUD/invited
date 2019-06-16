import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { withRouter } from 'react-router-dom';

import { Auth } from 'aws-amplify';

const SignUp = ({ history }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const { handleSubmit, register } = useForm();

  const onSubmit = async data => {
    if (!showConfirmation) {
      signUp(data);
    } else {
      confirmSignUp(data);
    }
  };

  const signUp = ({ username, password, email }) => {
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    })
      .then(() => {
        setShowConfirmation(true);
        setNewUsername(username);
        setError('');
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };
  const confirmSignUp = ({ authCode }) => {
    Auth.confirmSignUp(newUsername, authCode)
      .then(() => history.push('/app'))
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!showConfirmation && (
        <>
          <h2>Sign In</h2>

          <div>
            <label htmlFor="username">Username</label>
            <input name="username" type="text" ref={register} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" ref={register} />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" ref={register} />
          </div>
        </>
      )}
      {showConfirmation && (
        <div>
          <label htmlFor="authCode">Confirmation code</label>
          <input name="authCode" type="password" ref={register} />
        </div>
      )}

      <div>{error}</div>
      <input className="button" type="submit" />
    </form>
  );
};

export default withRouter(SignUp);
