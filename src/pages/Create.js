import React from 'react';
import useForm from 'react-hook-form';
import { createEvent } from '../mutations/eventMutations';
import useFetcher from '../hooks/useFetcher';
import Input from '../components/Input';

export default () => {
  const { handleSubmit, register, watch, errors } = useForm();
  const {
    fetcher,
    state: { errorMessage },
  } = useFetcher();

  const onSubmit = async data => {
    fetcher({ ...createEvent, params: data });
  };
  const fields = watch();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {fields ? (
          <p>
            Invite from {fields.host} for a {fields.type} at {fields.place}, {fields.time} {fields.date}.
          </p>
        ) : null}
        <Input required name="name" label="Name" type="text" register={register} errors={errors} />
        <Input required name="host" label="Host" type="text" register={register} errors={errors} />
        <Input required name="type" label="Type" type="text" register={register} errors={errors} />
        <Input required name="place" label="Place" type="text" register={register} errors={errors} />
        <Input required name="time" label="Time" type="text" register={register} errors={errors} />
        <Input required name="date" label="Date" type="text" register={register} errors={errors} />
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <input className="button" type="submit" />
    </form>
  );
};
