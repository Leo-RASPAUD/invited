import React from 'react';
import useForm from 'react-hook-form';
import { createEvent } from '../mutations/event';
import useFetcher from '../hooks/useFetcher';

export default () => {
  const { handleSubmit, register, watch } = useForm();
  const { fetcher } = useFetcher();

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
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" ref={register} />
        </div>
        <div>
          <label htmlFor="host">Host</label>
          <input name="host" type="text" ref={register} />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input name="type" type="text" ref={register} />
        </div>
        <div>
          <label htmlFor="place">Place</label>
          <input name="place" type="text" ref={register} />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input name="time" type="text" ref={register} />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input name="date" type="text" ref={register} />
        </div>
      </div>
      <input type="submit" />
    </form>
  );
};
