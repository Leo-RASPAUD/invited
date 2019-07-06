import React, { useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router';
import Input from './Input';
import MaxWidth from './MaxWidth';
import useForm from 'react-hook-form';
import Button, { Buttons } from './Button';
import Error from './Error';
import { Context } from '../AppContext';
import { actions } from '../reducers/globalReducer';

const ResetPassword = ({ history, email, disabled, redirect }) => {
  const { dispatchGlobal } = useContext(Context);
  const [isResetPassword, setResetPassword] = useState(false);
  const [error, setError] = useState('');
  const { handleSubmit, register, errors } = useForm();

  const resetPassword = async () => {
    try {
      await Auth.forgotPassword(email);
      setResetPassword(true);
      dispatchGlobal({
        type: actions.newSnackbarItem,
        customMessage: 'A confirmation code has been sent to your email address',
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const onSubmit = async ({ confirmationCode, newPassword }) => {
    try {
      await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
      setResetPassword(false);
      setError('');
      if (redirect) {
        history.push('/login');
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isResetPassword && (
        <MaxWidth>
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
        </MaxWidth>
      )}
      {error.length > 0 && <Error errorMessage={error} />}
      <Buttons>
        {!isResetPassword && (
          <Button type="button" onClick={resetPassword} disabled={disabled}>
            Reset password
          </Button>
        )}
        {isResetPassword && (
          <>
            <Button
              type="button"
              onClick={() => {
                setResetPassword(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </>
        )}
      </Buttons>
    </form>
  );
};

export default withRouter(ResetPassword);
