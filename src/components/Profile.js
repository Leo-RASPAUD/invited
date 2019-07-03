import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Input from './Input';
import Container from './Container';
import Grid from './Grid';
import GridItem from './GridItem';
import useForm from 'react-hook-form';
import PageTitle from './PageTitle';
import Button from './Button';
import Tool from './Tool';
import Tools from './Tools';
import ResetPassword from './ResetPassword';
import Error from './Error';

import styles from './Profile.module.scss';

export default ({ user }) => {
  const { register, errors, handleSubmit, reset } = useForm();
  const [changePasswordError, setChangePasswordError] = useState('');
  const [successPassword, setSuccessPassword] = useState(false);

  const changePassword = async ({ oldPassword, newPassword }) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
      setSuccessPassword(true);
      setTimeout(() => {
        setSuccessPassword(false);
      }, 2000);

      reset();
    } catch (error) {
      setChangePasswordError(error.message);
    }
  };

  return (
    <>
      <Container>
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
      <Container>
        <PageTitle>Change password</PageTitle>
        {successPassword && <h4>Password changed successfully.</h4>}
      </Container>
      <form className={styles['container']} onSubmit={handleSubmit(changePassword)}>
        <Container>
          <Grid>
            <GridItem>
              <Input
                required
                name="oldPassword"
                label="Old password"
                type="password"
                register={register}
                errors={errors}
                row={false}
              />
              <Input
                required
                name="newPassword"
                label="New password"
                type="password"
                register={register}
                errors={errors}
                row={false}
              />
            </GridItem>
          </Grid>
        </Container>
        {changePasswordError.length > 0 && (
          <Container>
            <Grid>
              <GridItem>
                <Error errorMessage={changePasswordError} />
              </GridItem>
            </Grid>
          </Container>
        )}
        <Tools>
          <Tool>
            <Button type="submit">Submit</Button>
          </Tool>
        </Tools>
      </form>

      <Container>
        <PageTitle>Forgot password</PageTitle>
      </Container>
      <Container>
        <div>A confirmation code will be sent in your email address.</div>
      </Container>
      <ResetPassword username={user.username} />
    </>
  );
};
