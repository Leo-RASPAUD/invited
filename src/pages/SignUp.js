import React, { useState, useContext } from 'react';
import useForm from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import UserContext from '../UserContext';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Input from '../components/Input';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import Error from '../components/Error';
import Tool from '../components/Tool';
import Tools from '../components/Tools';

import { Auth } from 'aws-amplify';

const SignUp = ({ history }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { updateCurrentUser } = useContext(UserContext);
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
      const user = await Auth.signIn(newEmail, newPassword);
      updateCurrentUser(user);
      history.push('/app');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <PageTitle>Sign Up</PageTitle>
      </Container>
      <Container>
        {!showConfirmation && (
          <Grid>
            <GridItem>
              <Input required name="email" label="Email" type="email" register={register} errors={errors} />
              <Input required name="password" label="Password" type="password" register={register} errors={errors} />
            </GridItem>
          </Grid>
        )}
        {showConfirmation && (
          <Grid>
            <GridItem>
              <Input
                required
                name="authCode"
                label="Confirmation code"
                type="text"
                register={register}
                errors={errors}
              />
            </GridItem>
          </Grid>
        )}
      </Container>
      <Tools>
        <Tool>
          {error.length > 0 && <Error errorMessage={error} />}
          <Button type="submit">Sign up</Button>
        </Tool>
      </Tools>
    </form>
  );
};

export default withRouter(SignUp);
