import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import config from './config';
import { events, EventsContext } from './events-context';
import Events from './Events';
import EventsRoutes from './EventsRoutes';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Create from './pages/Create';

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
            <Route exact path="/" component={Home} />
            <Route exact path="/new" component={Create} />
            <EventsRoutes />
          </div>
        </Router>
      </EventsContext.Provider>
    </div>
  );
}

// export default App;

export default withAuthenticator(App);
