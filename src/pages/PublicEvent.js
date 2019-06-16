import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { decrypt } from '../queries/guestQueries';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';

const PublicEvent = ({ location, match }) => {
  const encrypted = match.params.encrypted;
  const { loading, state, fetcher } = useFetcher();
  const { handleSubmit, register } = useForm();

  const {
    guest: { firstName, lastName, email, eventId },
    event: { name, host, type, place, date },
  } = state;

  const onSubmit = async data => {
    // fetcher({ ...acceptGuest, params: { ...data, eventId } });
  };

  useEffect(() => {
    fetcher({ ...decrypt, params: { encrypted } });
  }, []); // eslint-disable-line

  return (
    <div>
      {!loading && (
        <>
          <h1>{firstName} you're invited to the following event:</h1>
          <div>
            {firstName} {lastName} {email}
          </div>
          <div style={{ fontSize: 32, color: 'purple', backgroundColor: 'coral' }}>{name}</div>
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

export default withRouter(PublicEvent);
