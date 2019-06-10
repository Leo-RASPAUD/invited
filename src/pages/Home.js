import React from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../queries/event';
import useFetcher from '../hooks/useFetcher';

export default () => {
  const [loading, data] = useFetcher({ ...getEvents, withUser: true });

  return (
    <div>
      <Link to="/new">New event</Link>
      <div>
        <h1>My events</h1>
        {loading && <div>Loading ...</div>}
        {!loading && (
          <div>
            {data.map(data => (
              <div key={data.name}>{data.name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
