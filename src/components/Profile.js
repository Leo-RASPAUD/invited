import React from 'react';
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

import styles from './Profile.module.scss';

export default ({ user }) => {
  const { register, errors } = useForm();

  return (
    <>
      <form className={styles['container']}>
        <Container>
          <Grid>
            <GridItem>
              <Input
                required={false}
                name="username"
                label="Username"
                type="text"
                register={register}
                errors={errors}
                disabled
                defaultValue={user.username}
              />
            </GridItem>
          </Grid>
        </Container>
        <Container>
          <PageTitle>Change password</PageTitle>
        </Container>
        <Container>
          <Grid>
            <GridItem>
              <Input
                required={false}
                name="oldPassword"
                label="Old password"
                type="password"
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
