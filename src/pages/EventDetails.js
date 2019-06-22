import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useForm from 'react-hook-form';
import { getEvent, sendInvites as sendInvitesQuery } from '../queries/eventQueries';
import { addGuest, deleteGuest as deleteGuestMutation } from '../mutations/guestMutations';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';
import errorTypes from '../constants/errorTypes';
import stringUtils from '../utils/stringUtils';
import Input from '../components/Input';
import Error from '../components/Error';

const EventDetails = ({ location, match }) => {
  const eventId = match.params.id;
  const { loading, state, fetcher } = useFetcher();
  const { handleSubmit, register, errors } = useForm();
  const {
    event: { name, type, place, date, host },
    guests = [],
    errorMessage,
    errorType,
  } = state;

  const onSubmit = data => {
    const copy = stringUtils.removeEmptyValues(data);
    fetcher({ ...addGuest, params: { ...copy, eventId } });
  };

  const deleteGuest = id => {
    fetcher({ ...deleteGuestMutation, params: { id } });
  };

  const sendInvites = () => {
    fetcher({
      ...sendInvitesQuery,
      params: { name, type, place, date, host, guests: JSON.stringify(guests) },
    });
  };

  useEffect(() => {
    fetcher({ ...getEvent, params: { id: eventId } });
  }, []); // eslint-disable-line

  return (
    <div>
      {errorType === errorTypes.getEvent && <Error errorMessage={errorMessage} />}
      {!loading && (!errorType || errorType !== errorTypes.getEvent) && (
        <>
          <h1>{name}</h1>
          <div>Id: {eventId}</div>
          <div>Type: {type}</div>
          <div>Place: {place}</div>
          <div>Date: {date}</div>
          <div>Host: {host}</div>

          <h3>Guests</h3>
          {guests.map(guest => (
            <div key={guest.id}>
              {guest.loading && <div>Loading</div>}
              <div>{guest.firstName}</div>
              <div>{guest.lastName}</div>
              <div>{guest.email}</div>
              {guest.notes && <div>Notes: {guest.notes}</div>}
              <div>Accepted</div>
              <input type="checkbox" defaultChecked={guest.accepted} disabled />
              <button onClick={() => deleteGuest(guest.id)}>Delete</button>
              {errorType === errorTypes.deleteGuest && errorMessage && <Error errorMessage={errorMessage} />}
              <div>
                <Link to={`/event/${guest.encrypted}`}>Public page</Link>
              </div>
            </div>
          ))}
          <h3>Send</h3>
          <button onClick={sendInvites}>Send invites</button>
          {errorType === errorTypes.sendInvites && errorMessage && <Error errorMessage={errorMessage} />}
          <h3>Add guest</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input required name="firstName" label="First name" type="text" register={register} errors={errors} />
            <Input required name="lastName" label="Last name" type="text" register={register} errors={errors} />
            <Input required name="email" label="Email" type="text" register={register} errors={errors} />
            {errorType === errorTypes.addGuest && errorMessage && <Error errorMessage={errorMessage} />}
            <input className="button" type="submit" />
          </form>
        </>
      )}
    </div>
  );
};

export default withRouter(EventDetails);
