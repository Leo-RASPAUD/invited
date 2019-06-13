import React, { useContext } from 'react';
import useForm from 'react-hook-form';
import graphql from '../utils/graphql';
import { Context } from '../AppContext';
import eventMutations from '../mutations/event';
import { actions } from '../reducers/eventReducer';

export default () => {
  const { register, handleSubmit } = useForm();
  const { state, dispatchEvents } = useContext(Context);
  const onSubmit = async data => {
    await graphql.mutation({ ...eventMutations.createEvent, params: { name: data.name } });
    dispatchEvents({ type: actions.createEvent, payload: { event: data } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input name="name" placeholder="Name" ref={register} />
      </div>
      <input type="submit" />
    </form>
  );
};
