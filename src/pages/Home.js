import React from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../queries/event';
import useFetcher from '../hooks/useFetcher';
import Event from '../components/Event';

export default () => {
  const [loading, data] = useFetcher(getEvents);
  return (
    <div>
      <Link to="/new">New event</Link>
      <div>
        <h1>My events</h1>
        {loading && <div>Loading ...</div>}
        {!loading && data.map(event => <Event key={event.id} {...event} />)}
      </div>
    </div>
  );
};
