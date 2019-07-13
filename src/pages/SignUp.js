import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import Container from '../components/Container';
import MaxWidth from '../components/MaxWidth';
import Input from '../components/Input';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import Error from '../components/Error';
import Tool from '../components/Tool';
import Tools from '../components/Tools';
import GoogleButton from 'react-google-button';

import { Auth } from 'aws-amplify';

const SignUp = ({ history }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async data => {
    if (!showConfirmation) {
      signUp(data);
    } else {
      confirmSignUp(data);
    }
  };

  const signUp = async ({ password, email }) => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      setShowConfirmation(true);
      setNewEmail(email);
      setNewPassword(password);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmSignUp = async ({ authCode }) => {
    try {
      await Auth.confirmSignUp(newEmail, authCode);
      await Auth.signIn(newEmail, newPassword);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <MaxWidth>
          <PageTitle>Sign up</PageTitle>
          <p>
            Short on time? <br />
            You can sign up with <strong>Google</strong>.
          </p>
          <Tools>
            <Tool>
              <GoogleButton
                onClick={() => {
                  Auth.federatedSignIn({ provider: 'Google' });
                }}
                style={{ boxShadow: 'none', padding: 1 }}
              />
            </Tool>
          </Tools>
          {!showConfirmation && (
            <>
              <p>
                Here is email sign up <strong>Gary</strong>. Leo fails to understand why you not auth with Google. You
                be you.
              </p>
              <Input required name="email" label="Email" type="email" register={register} errors={errors} />
              <Input required name="password" label="Password" type="password" register={register} errors={errors} />
            </>
          )}
          {showConfirmation && (
            <Input required name="authCode" label="Confirmation code" type="text" register={register} errors={errors} />
          )}
          <Tools>
            <Tool>
              {error.length > 0 && <Error errorMessage={error} />}
              <Button type="submit">Sign up</Button>
            </Tool>
          </Tools>
        </MaxWidth>
      </Container>
    </form>
  );
};

export default withRouter(SignUp);
