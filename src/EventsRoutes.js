import React from 'react';
import { Route } from 'react-router-dom';
import { EventsContext } from './events-context';
import Event from './Event';

function EventsRoutes() {
  return (
    <EventsContext.Consumer>
      {events =>
        events.map((event, index) => (
          <Route component={Event} exact key={`${event.type}${event.index}`} path={event.url} />
        ))
      }
    </EventsContext.Consumer>
  );
}

export default EventsRoutes;
