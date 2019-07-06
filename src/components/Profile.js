import React, { useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import Input from './Input';
import Container from './Container';
import Grid from './Grid';
import GridItem from './GridItem';
import useForm from 'react-hook-form';
import PageTitle from './PageTitle';
import Button, { Buttons } from './Button';
import ResetPassword from './ResetPassword';
import Error from './Error';
import { Context } from '../AppContext';
import { actions } from '../reducers/globalReducer';

import styles from './Profile.module.scss';

export default ({ user }) => {
  const { dispatchGlobal } = useContext(Context);
  const { register, errors, handleSubmit, reset } = useForm();
  const [changePasswordError, setChangePasswordError] = useState('');

  const changePassword = async ({ oldPassword, newPassword }) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
      dispatchGlobal({
        type: actions.newSnackbarItem,
        customMessage: 'Password changed successfully',
      });
      reset();
    } catch (error) {
      setChangePasswordError(error.message);
    }
  };

  return (
    <>
      <Container>
        <PageTitle>Profile</PageTitle>
        <p>Emails can't be edited. Might be something we will do in future.</p>
        <Grid>
          <GridItem>
            <Input
              required={false}
              name="email"
              label="Email"
              type="text"
              errors={errors}
              disabled
              defaultValue={user.email}
            />
          </GridItem>
        </Grid>
      </Container>
      <div className="white-teal">
        <Container>
          <PageTitle>Change password</PageTitle>
          <p>Embarressing old password? Get a fancy new password right here.</p>
          <form className={styles['container']} onSubmit={handleSubmit(changePassword)}>
            <Grid>
              <GridItem>
                <Input
                  required
                  name="oldPassword"
                  label="Old password"
                  type="password"
                  register={register}
                  errors={errors}
                />
                <Input
                  required
                  name="newPassword"
                  label="New password"
                  type="password"
                  register={register}
                  errors={errors}
                />
              </GridItem>
            </Grid>
            {changePasswordError.length > 0 && <Error errorMessage={changePasswordError} />}
            <Buttons>
              <Button type="submit">Submit</Button>
            </Buttons>
          </form>
        </Container>
      </div>
      <div className="orange-yellow">
        <Container>
          <PageTitle>Forgot password</PageTitle>
          <p>A confirmation code will be sent to your email address.</p>
          <ResetPassword email={user.email} />
        </Container>
      </div>
    </>
  );
};
