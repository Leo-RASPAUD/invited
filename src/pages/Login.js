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

const Login = ({ history }) => {
  const [error, setError] = useState('');
  const { updateCurrentUser } = useContext(UserContext);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async data => {
    signIn(data);
  };

  const signIn = ({ username, password }) => {
    Auth.signIn(username, password)
      .then(user => {
        updateCurrentUser(user);
        history.push('/app');
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <PageTitle>Sign In</PageTitle>
      </Container>
      <Container>
        <Grid>
          <GridItem>
            <Input required name="username" label="Name" type="text" register={register} errors={errors} />
            <Input required name="password" label="Password" type="password" register={register} errors={errors} />
            <div>{error}</div>
            <Button type="submit">Get</Button>
          </GridItem>
        </Grid>
      </Container>
    </form>
  );
};

export default withRouter(Login);
