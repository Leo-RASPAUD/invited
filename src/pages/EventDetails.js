import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import useForm from 'react-hook-form';
import { getEvent } from '../queries/eventQueries';
import { addGuest, deleteGuest as deleteGuestMutation } from '../mutations/guestMutations';
import { Context } from '../AppContext';
import useFetcher from '../hooks/useFetcher';
import { actions } from '../reducers/guestsReducer';
import { withRouter } from 'react-router';

const EventDetails = ({ location, match }) => {
  const eventId = match.params.id;
  const { loading, state, fetcher } = useFetcher();
  const { handleSubmit, register } = useForm();
  const { dispatchEvents } = useContext(Context);
  const {
    event: { name, type, place, date, host },
    guests = [],
  } = state;

  const onSubmit = async data => {
    fetcher({ ...addGuest, params: { ...data, eventId } });
  };

  const deleteGuest = async id => {
    dispatchEvents({ type: actions.deleteGuestLoading, payload: { id } });
    try {
      fetcher({ ...deleteGuestMutation, params: { id } });
    } catch (error) {
      dispatchEvents({ type: actions.deleteGuestError, payload: { id } });
    }
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

          <h3>Guests</h3>
          {guests.map(guest => (
            <div key={guest.id}>
              {guest.loading && <div>Loading</div>}
              <div>{guest.firstName}</div>
              <div>{guest.lastName}</div>
              <div>{guest.email}</div>
              <div>{guest.encrypted}</div>
              <button onClick={() => deleteGuest(guest.id)}>Delete</button>
              <div>
                <Link to={`/event/${guest.encrypted}`}>Public page</Link>
              </div>
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
            <input className="button" type="submit" />
          </form>
        </>
      )}
    </div>
  );
};

export default withRouter(EventDetails);
