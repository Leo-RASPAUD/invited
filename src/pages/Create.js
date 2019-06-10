import React from 'react';
import useForm from 'react-hook-form';
import graphql from '../utils/graphql';
import eventMutations from '../mutations/event';

export default () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    await graphql.mutation({ ...eventMutations.createEvent, params: { name: data.name } });
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
