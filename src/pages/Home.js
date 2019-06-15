import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../queries/event';
import useFetcher from '../hooks/useFetcher';
import Event from '../components/Event';

export default () => {
  const [loading, state, getData] = useFetcher();

  useEffect(() => {
    getData(getEvents);
  }, []); //eslint-disable-line

  return (
    <div>
      <Link to="/app/new">New event</Link>
      <div>
        <h1>My events</h1>
        {loading && <div>Loading ...</div>}
        {!loading && state.events.map(event => <Event key={event.id} {...event} />)}
      </div>
    </div>
  );
};
