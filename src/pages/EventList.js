import React, { useEffect } from 'react';
import { getEvents } from '../queries/eventQueries';
import useFetcher from '../hooks/useFetcher';
import Event from '../components/Event';
import Button from '../components/Button';
import Error from '../components/Error';

export default () => {
  const {
    loading,
    state: { events, errorMessage },
    fetcher,
  } = useFetcher();

  useEffect(() => {
    fetcher(getEvents);
  }, []); // eslint-disable-line

  return (
    <div>
      <Button to="/app/new">New event</Button>
      <div>
        <h1>My events</h1>
        {loading && <div>Loading ...</div>}
        {errorMessage && <Error errorMessage={errorMessage} />}
        {!loading && events.map(event => <Event key={event.id} {...event} />)}
      </div>
    </div>
  );
};
