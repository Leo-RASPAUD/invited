import React from 'react';
import { EventsContext } from './events-context';

function Event(props) {
  return (
    <EventsContext.Consumer>
      {events => {
        const event = events.find(event => event.url === props.match.url);
        return (
          <div>
            <p>{event.introduction}</p>
            <h2>{event.host}</h2>
            <p>would like to invite you for their</p>
            <h1>{event.type}</h1>
            <p>
              {event.time}, {event.date}
            </p>
            <p>{event.location}</p>
          </div>
        );
      }}
    </EventsContext.Consumer>
  );
}

export default Event;
