import React from 'react';
import Input from './Input';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import useForm from 'react-hook-form';

import styles from './Profile.module.scss';

export default ({ user }) => {
  const { register, errors } = useForm();
  return (
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
    </form>
  );
};
