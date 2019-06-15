import React, { useEffect } from 'react';
import { getEvent } from '../queries/event';
import useFetcher from '../hooks/useFetcher';
import { withRouter } from 'react-router';

const EventDetails = ({ location, match }) => {
  const eventId = match.params.id;
  const { loading, state, getData } = useFetcher();
  const {
    event: { name, id, guests = [] },
  } = state;

  useEffect(() => {
    getData({ ...getEvent, params: { id: eventId } });
  }, []); // eslint-disable-line

  return (
    <div>
      {!loading && (
        <>
          <div>{name}</div>
          <div>{id}</div>
          {guests.map(guest => (
            <div key={guest.id}>
              <div>{guest.firstName}</div>
              <div>{guest.lastName}</div>
              <div>{guest.email}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default withRouter(EventDetails);
