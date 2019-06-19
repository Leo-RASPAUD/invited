import React, { useEffect } from 'react';
import { getEvents } from '../queries/eventQueries';
import useFetcher from '../hooks/useFetcher';
import Event from '../components/Event';
import Button from '../components/Button'

export default () => {
  const { loading, state, fetcher } = useFetcher();

  useEffect(() => {
    fetcher(getEvents);
  }, []); // eslint-disable-line

  return (
    <div>
      <Button to="/app/new">New event</Button>
      <div>
        <h1>My events</h1>
        {loading && <div>Loading ...</div>}
        {!loading && state.events.map(event => <Event key={event.id} {...event} />)}
      </div>
    </div>
  );
};
