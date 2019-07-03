import React, { useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import UserContext from '../UserContext';
import useForm from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Input from '../components/Input';
import PageTitle from '../components/PageTitle';
import Error from '../components/Error';
import Tool from '../components/Tool';
import Tools from '../components/Tools';
import GoogleButton from 'react-google-button';

const Login = ({ history }) => {
  const [error, setError] = useState('');
  const { updateCurrentUser } = useContext(UserContext);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const user = await Auth.signIn(email, password);
      updateCurrentUser(user);
      history.push('/app');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <PageTitle>Sign In</PageTitle>
        </Container>
        <Container>
          <Grid>
            <GridItem>
              <Input required name="email" label="Email" type="text" register={register} errors={errors} />
              <Input required name="password" label="Password" type="password" register={register} errors={errors} />
            </GridItem>
          </Grid>
        </Container>
        {error.length > 0 && (
          <Container>
            <Grid>
              <GridItem>
                <Error errorMessage={error} />
              </GridItem>
            </Grid>
          </Container>
        )}
        <Tools>
          <Tool>
            <Button type="submit">Login</Button>
          </Tool>
          <Tool>
            <GoogleButton onClick={() => Auth.federatedSignIn({ provider: 'Google' })} style={{ padding: 1 }} />
          </Tool>
        </Tools>
        <Tools>
          <Tool>
            <Button to={'/forgotPassword'}>Forgot password</Button>
          </Tool>
        </Tools>
      </form>
    </>
  );
};

export default withRouter(Login);
