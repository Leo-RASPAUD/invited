import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Input from '../components/Input';
import Button from '../components/Button';
import Error from '../components/Error';
import PageTitle from '../components/PageTitle';

import { Auth } from 'aws-amplify';

const SignUp = ({ history }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async data => {
    if (!showConfirmation) {
      signUp(data);
    } else {
      confirmSignUp(data);
    }
  };

  const signUp = ({ password, email }) => {
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
    })
      .then(() => {
        setShowConfirmation(true);
        setNewEmail(email);
        setError('');
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };
  const confirmSignUp = ({ authCode }) => {
    Auth.confirmSignUp(newEmail, authCode)
      .then(() => history.push('/app'))
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <>
      <Container>
        <PageTitle>Sign up</PageTitle>
      </Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!showConfirmation && (
          <>
            <Container>
              <Grid>
                <GridItem>
                  <Input required name="email" label="Email" type="email" register={register} errors={errors} />
                  <Input
                    required
                    name="password"
                    label="Password"
                    type="password"
                    register={register}
                    errors={errors}
                  />
                </GridItem>
              </Grid>
            </Container>
          </>
        )}
        {showConfirmation && (
          <Container>
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
          </Container>
        )}

        <Error errorMessage={error} />
        <Button type="submit">Sign up</Button>
      </form>
    </>
  );
};

export default withRouter(SignUp);
