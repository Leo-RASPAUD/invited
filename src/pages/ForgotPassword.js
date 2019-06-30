import React from 'react';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import Input from '../components/Input';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import useForm from 'react-hook-form';
import ResetPassword from '../components/ResetPassword';

export default () => {
  const { register, errors, watch } = useForm();
  const username = watch('username') || '';

  return (
    <>
      <Container>
        <PageTitle>Forgot password</PageTitle>
      </Container>
      <form>
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
              />
            </GridItem>
          </Grid>
        </Container>
        <ResetPassword username={username} disabled={username.length === 0} redirect />
      </form>
    </>
  );
};
