import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { editEvent } from '../mutations/eventMutations';
import useFetcher from '../hooks/useFetcher';
import Button from '../components/Button';
import Tool from '../components/Tool';
import Tools from '../components/Tools';
import Container from '../components/Container';
import MaxWidth from '../components/MaxWidth';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { getEvent } from '../queries/eventQueries';
import PageTitle from '../components/PageTitle';
import { withRouter } from 'react-router';
import Error from '../components/Error';
import stringUtils from '../utils/stringUtils';
import Select from '../components/Select';
import eventTypes from '../constants/eventTypes';

const Edit = ({ history, match }) => {
  const eventId = match.params.id;
  const { handleSubmit, register, errors } = useForm();
  const { state, loading, fetcher } = useFetcher();

  const {
    event: { date, host, name, place, time, type, details },
    errorMessage,
  } = state;

  const onSubmit = async data => {
    const copy = stringUtils.removeEmptyValues(data);
    const isError = await fetcher({ ...editEvent, params: { ...copy, eventId } });
    if (!isError) {
      history.push('/app');
    }
  };

  useEffect(() => {
    fetcher({ ...getEvent, params: { id: eventId } });
  }, []); // eslint-disable-line
  if (loading) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <PageTitle>Edit an event</PageTitle>
        <MaxWidth>
          <Input
            defaultValue={name}
            required
            name="name"
            label="What is the name of the event?"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            required
            defaultValue={host}
            name="host"
            label="Who is the host of the event?"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            defaultValue={place}
            required
            name="place"
            label="Where is the place the event will be hosted?"
            type="text"
            register={register}
            errors={errors}
          />
          <Select
            label="What is the type of event?"
            register={register}
            errors={errors}
            name="type"
            required
            defaultValue={type}
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
            defaultValue={time}
            name="time"
            label="What time is the event?"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            required
            name="date"
            defaultValue={date}
            label="When will the event be held?"
            type="text"
            register={register}
            errors={errors}
          />
          <TextArea
            required
            name="details"
            label="All the other information people need to know (go nuts)."
            type="textarea"
            defaultValue={details}
            register={register}
            errors={errors}
          />
          {errorMessage && <Error errorMessage={errorMessage} />}
        </MaxWidth>
        <p>
          <strong>Warning!</strong> The buttons that follow look very similar but do <strong>very</strong> different
          things. If you have difficulty reading proceed with <strong>caution</strong>.
        </p>
        <Tools>
          <Tool>
            <Button type="submit">Update</Button>
          </Tool>
          <Tool>
            <Button to="/app">Cancel</Button>
          </Tool>
        </Tools>
      </Container>
    </form>
  );
};

export default withRouter(Edit);
