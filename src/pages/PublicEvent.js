import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { decrypt } from '../queries/guestQueries';
import { updateGuestInvitation } from '../mutations/guestMutations';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';

const PublicEvent = ({ location, match }) => {
  const encrypted = match.params.encrypted;
  const { loading, state, fetcher } = useFetcher();
  const { handleSubmit, register } = useForm();

  const {
    guest,
    guest: { firstName, lastName, email, eventId },
    event: { name, host, type, place, date },
  } = state;

  const onSubmit = async data => {
    const copy = { ...data };
    if (copy.notes === '') {
      delete copy.notes;
    }
    fetcher({
      ...updateGuestInvitation,
      params: { ...guest, ...copy, accepted: data.accepted === 'on' ? true : false },
    });
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
            <label htmlFor="notes">notes / dietary requirements</label>
            <input name="notes" type="textarea" ref={register} />
            <label htmlFor="accepted">accept</label>
            <input name="accepted" type="checkbox" ref={register} />
            <input type="submit" className="button" />
          </form>
        </>
      )}
    </div>
  );
};

export default withRouter(PublicEvent);
