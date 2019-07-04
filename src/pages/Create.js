import React from 'react';
import useForm from 'react-hook-form';
import { createEvent } from '../mutations/eventMutations';
import useFetcher from '../hooks/useFetcher';
import Button from '../components/Button';
import Tool from '../components/Tool';
import Tools from '../components/Tools';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import Input from '../components/Input';
import PageTitle from '../components/PageTitle';
import { withRouter } from 'react-router';
import Error from '../components/Error';
import stringUtils from '../utils/stringUtils';
import Select from '../components/Select';
import eventTypes from '../constants/eventTypes';

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
      <Container>
        <PageTitle>Create an event</PageTitle>
      </Container>
      <Container>
        <Grid>
          <GridItem>
            <Input
              required
              name="name"
              label="What is the name of the event?"
              type="text"
              register={register}
              errors={errors}
            />
            <Input
              required
              name="host"
              label={
                <>
                  Who is the host of the event? <i>Enter as a possessive.</i>
                </>
              }
              type="text"
              register={register}
              errors={errors}
            />
            <Input
              required
              name="place"
              label="Where is the place the event will be hosted?"
              type="text"
              register={register}
              errors={errors}
            />
            <Select
              label={
                <>
                  What is the type of event? <i>We'll add an appropriate theme.</i>
                </>
              }
              register={register}
              errors={errors}
              name="type"
              required
            >
              <option value="">Select</option>
              {Object.keys(eventTypes).map(value => (
                <option key={value} value={value}>
                  {eventTypes[value]}
                </option>
              ))}
            </Select>
            <Input
              required
              name="time"
              label="What time is the event?"
              type="text"
              register={register}
              errors={errors}
            />
            <Input
              required
              name="date"
              label="When will the event be held?"
              type="text"
              register={register}
              errors={errors}
            />
            {errorMessage && <Error errorMessage={errorMessage} />}
          </GridItem>
        </Grid>
      </Container>
      <Container>
        <p>
          <strong>Warning!</strong> The buttons that follow look very similar but do very different things. If you have
          difficulty reading proceed with caution.
        </p>
      </Container>
      <Tools>
        <Tool>
          <Button type="submit">Create</Button>
        </Tool>
        <Tool>
          <Button to="/app">Cancel</Button>
        </Tool>
      </Tools>
    </form>
  );
};

export default withRouter(Create);
