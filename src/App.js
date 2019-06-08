import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import config from './config';
import { events, EventsContext } from './events-context';
import Events from './Events';
import EventsRoutes from './EventsRoutes';
import Navigation from './Navigation';

import './App.css';

Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <EventsContext.Provider value={events}>
        <Router>
          <div>
            <Navigation />
            <Route exact path="/events" component={Events} />
            <EventsRoutes />
          </div>
        </Router>
      </EventsContext.Provider>
    </div>
  );
}

export default withAuthenticator(App);
