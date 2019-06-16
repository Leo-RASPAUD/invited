import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import config from './config';
import Navigation from './components/Navigation';
import Create from './pages/Create';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import { Context, initialStateEvents, initialStateGuests } from './AppContext';
import { reducer as eventsReducer } from './reducers/eventsReducer';
import { reducer as guestReducer } from './reducers/guestsReducer';

import './App.css';
import PublicEvent from './pages/PublicEvent';

Amplify.configure(config);

const PrivateRoutes = () => {
  return (
    <>
      <Route exact path="/app" component={EventList} />
      <Route exact path="/app/new" component={Create} />
      <Route exact path="/app/event/:id" component={EventDetails} />
    </>
  );
};

const Wrapped = withAuthenticator(PrivateRoutes);

const App = () => {
  const [stateEvents, dispatchEvents] = useReducer(eventsReducer, initialStateEvents);
  const [stateGuests, dispatchGuests] = useReducer(guestReducer, initialStateGuests);

  return (
    <div className="App">
      <Context.Provider
        value={{
          state: { ...stateEvents, ...stateGuests },
          dispatchEvents,
          dispatchGuests,
          dispatchEvent,
        }}
      >
        <Router>
          <Navigation />
          <Route
            exact
            path="/"
            component={() => {
              return <div>Home page</div>;
            }}
          />
          <Route exact path="/event/:id" component={PublicEvent} />
          <Wrapped />
        </Router>
      </Context.Provider>
    </div>
  );
};

export default App;
