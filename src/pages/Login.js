import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import useForm from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import Container from '../components/Container';
import MaxWidth from '../components/MaxWidth';
import Input from '../components/Input';
import PageTitle from '../components/PageTitle';
import Error from '../components/Error';
import Tool from '../components/Tool';
import Tools from '../components/Tools';
import GoogleButton from 'react-google-button';

const Login = ({ history }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await Auth.signIn(email, password);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageTitle>Sign in</PageTitle>
        <MaxWidth>
          <Input required name="email" label="Email" type="text" register={register} errors={errors} />
          <Input required name="password" label="Password" type="password" register={register} errors={errors} />
        </MaxWidth>
        {error.length > 0 && (
          <Container>
            <MaxWidth>
              <Error errorMessage={error} />
            </MaxWidth>
          </Container>
        )}
        <Tools>
          <Tool>
            <Button type="submit" disabled={loading}>
              Login
            </Button>
          </Tool>
        </Tools>

        <p>
          <strong>Or</strong> sign in with <strong>Google</strong>.
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
        <p>
          Can't login, that's <strong>okay</strong>.
        </p>
        <Tools>
          <Tool>
            <Button to={'/forgotPassword'}>Forgot password</Button>
          </Tool>
        </Tools>
      </form>
    </Container>
  );
};

export default withRouter(Login);
