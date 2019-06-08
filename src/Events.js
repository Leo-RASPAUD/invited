import React from 'react';
import { Link } from 'react-router-dom';
import { EventsContext } from './events-context';

function Events() {
  return (
    <EventsContext.Consumer>
      {events => {
        return (
          <div className="Events">
            <h1>Events</h1>
            <ul>
              {events.map(({ date, location, time, type, url }, index) => (
                <li key={`${type}${index}`}>
                  {type}, {time}, {location} <Link to={url}>View</Link>{' '}
                  <button onClick={() => alert('Do edit.')}>Edit</button>{' '}
                  <button onClick={() => alert('Do delete.')}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </EventsContext.Consumer>
  );
}

export default Events;
