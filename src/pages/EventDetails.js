import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvent } from '../queries/event';
import useFetcher from '../hooks/useFetcher';
import Event from '../components/Event';
import { withRouter } from 'react-router';
import guest from '../types/guest';

const EventDetails = ({ location, match }) => {
  // const [loading, state] = useFetcher(getEvents);
  const eventId = match.params.id;
  const [loading, state, getData] = useFetcher();
  const {
    event: { name, id, guests = [] },
  } = state;

  useEffect(() => {
    getData({ ...getEvent, params: { id: eventId } });
  }, []);

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
