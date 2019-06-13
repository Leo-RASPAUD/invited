import React, { useContext } from 'react';
import useForm from 'react-hook-form';
import graphql from '../utils/graphql';
import { Context } from '../AppContext';
import eventMutations from '../mutations/event';
import { actions } from '../reducers/eventReducer';

export default () => {
  const { handleSubmit, register, watch } = useForm();
  const { dispatchEvents } = useContext(Context);
  const onSubmit = async data => {
    const result = await graphql.mutation({ ...eventMutations.createEvent, params: data });
    dispatchEvents({ type: actions.createEvent, payload: { event: result } });
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
