import React from 'react';
import useForm from 'react-hook-form';
import { createEvent } from '../mutations/eventMutations';
import useFetcher from '../hooks/useFetcher';
import Button from '../components/Button'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import Input from '../components/Input';
import { withRouter } from 'react-router';
import Error from '../components/Error';
import stringUtils from '../utils/stringUtils';

const Create = ({ history }) => {
  const { handleSubmit, register, errors } = useForm();
  const {
    fetcher,
    state: { errorMessage },
  } = useFetcher();

  const onSubmit = async data => {
    const copy = stringUtils.removeEmptyValues(data);
    const isError = await fetcher({ ...createEvent, params: copy });
    if (!isError) {
      history.push('/app');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <GridItem>
          <Input required name="name" label="Name" type="text" register={register} errors={errors} />
          <Input required name="host" label="Host" type="text" register={register} errors={errors} />
          <Input required name="type" label="Type" type="text" register={register} errors={errors} />
          <Input required name="place" label="Place" type="text" register={register} errors={errors} />
          <Input required name="time" label="Time" type="text" register={register} errors={errors} />
          <Input required name="date" label="Date" type="text" register={register} errors={errors} />
          {errorMessage && <Error errorMessage={errorMessage} />}
          <Button type="submit">Create</Button>
        </GridItem>
      </Grid>
    </form>
  );
};

export default withRouter(Create);
