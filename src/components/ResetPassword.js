import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router';
import Input from './Input';
import Container from './Container';
import Grid from './Grid';
import GridItem from './GridItem';
import useForm from 'react-hook-form';
import Button from './Button';
import Tool from './Tool';
import Tools from './Tools';
import Error from './Error';

const ResetPassword = ({ history, username, disabled, redirect }) => {
  const [isResetPassword, setResetPassword] = useState(false);
  const [error, setError] = useState('');
  const { handleSubmit, register, errors } = useForm();

  const resetPassword = async () => {
    try {
      await Auth.forgotPassword(username);
      setResetPassword(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const onSubmit = async ({ confirmationCode, newPassword }) => {
    try {
      await Auth.forgotPasswordSubmit(username, confirmationCode, newPassword);
      setResetPassword(false);
      setError('');
      if (redirect) {
        history.push('/login');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isResetPassword && (
        <Container>
          <Grid>
            <GridItem>
              <Input
                required={false}
                name="confirmationCode"
                label="Confirmation code"
                type="text"
                register={register}
                errors={errors}
              />
              <Input
                required={false}
                name="newPassword"
                label="New password"
                type="password"
                register={register}
                errors={errors}
              />
            </GridItem>
          </Grid>
        </Container>
      )}
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
        {!isResetPassword && (
          <Tool>
            <Button type="button" onClick={resetPassword} disabled={disabled}>
              Reset password
            </Button>
          </Tool>
        )}
        {isResetPassword && (
          <>
            <Tool>
              <Button
                type="button"
                onClick={() => {
                  setResetPassword(false);
                }}
              >
                Cancel
              </Button>
            </Tool>
            <Tool>
              <Button type="submit">Submit</Button>
            </Tool>
          </>
        )}
      </Tools>
    </form>
  );
};

export default withRouter(ResetPassword);
