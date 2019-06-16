import React, { useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import UserContext from '../UserContext';
import useForm from 'react-hook-form';

import { withRouter } from 'react-router-dom';

const Login = ({ history }) => {
  const [error, setError] = useState('');
  const { updateCurrentUser } = useContext(UserContext);

  const { handleSubmit, register } = useForm();

  const onSubmit = async data => {
    signIn(data);
  };

  const signIn = ({ username, password }) => {
    Auth.signIn(username, password)
      .then(user => {
        updateCurrentUser(user);
        history.push('/app');
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>

      <div>
        <label htmlFor="username">Username</label>
        <input name="username" type="text" ref={register} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" ref={register} />
      </div>

      <div>{error}</div>
      <input className="button" type="submit" />
    </form>
  );
};

export default withRouter(Login);
