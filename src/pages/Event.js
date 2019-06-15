import React, { useEffect } from 'react';
// import { useContext } from 'react';
import useForm from 'react-hook-form';
import { getEvent } from '../queries/eventQueries';
// import { Context } from '../AppContext';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';

const EventDetails = ({ location, match }) => {
  const eventId = match.params.id;
  const { loading, state, fetcher } = useFetcher();
  const { handleSubmit, register } = useForm();
  // const { dispatchEvents } = useContext(Context);
  const {
    event: { name, type, place, date, host },
  } = state;

  const onSubmit = async data => {
    //fetcher({ ...acceptGuest, params: { ...data, eventId } });
  };

  useEffect(() => {
    fetcher({ ...getEvent, params: { id: eventId } });
  }, []); // eslint-disable-line

  return (
    <div>
      {!loading && (
        <>
          <h1>{name}</h1>
          <div>Id: {eventId}</div>
          <div>Type: {type}</div>
          <div>Place: {place}</div>
          <div>Date: {date}</div>
          <div>Host: {host}</div>
          <h3>Accept</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">Email</label>
              <input name="email" type="email" ref={register} />
              <label htmlFor="notes">notes / dietary requirements</label>
              <input name="notes" type="textarea" ref={register} />
              <label htmlFor="accept">accept</label>
              <input name="accept" type="checkbox" ref={register} />
            </div>
            <input type="submit" />
          </form>
        </>
      )}
    </div>
  );
};

export default withRouter(EventDetails);
