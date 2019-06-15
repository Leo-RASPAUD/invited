import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { getEvent } from '../queries/event';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';

const EventDetails = ({ location, match }) => {
  const eventId = match.params.id;
  const { loading, state, getData } = useFetcher();
  const { handleSubmit, register, watch } = useForm();
  const {
    event: { name, id, guests = [] },
  } = state;

  const onSubmit = async data => {
    console.log(data);
  };
  useEffect(() => {
    getData({ ...getEvent, params: { id: eventId } });
  }, []); // eslint-disable-line

  return (
    <div>
      {!loading && (
        <>
          <h1>{name}</h1>
          <div>{id}</div>
          {guests.map(guest => (
            <div key={guest.id}>
              <div>{guest.firstName}</div>
              <div>{guest.lastName}</div>
              <div>{guest.email}</div>
            </div>
          ))}
          <h3>Add guest</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="firstName">First name</label>
                <input name="firstName" type="text" ref={register} />
              </div>
              <div>
                <label htmlFor="lastName">Last name</label>
                <input name="lastName" type="text" ref={register} />
              </div>
              <div>
                <label htmlFor="email">email</label>
                <input name="email" type="text" ref={register} />
              </div>
            </div>
            <input type="submit" />
          </form>
        </>
      )}
    </div>
  );
};

export default withRouter(EventDetails);
