import React, { useReducer, useState, useEffect } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import config from './config';
import { Context, initialStateEvents, initialStateGuests, initialGlobalState } from './AppContext';
import UserContext from './UserContext';
import { reducer as eventsReducer } from './reducers/eventsReducer';
import { reducer as guestReducer } from './reducers/guestsReducer';
import { reducer as globalReducer } from './reducers/globalReducer';
import Router from './Router';

import './App.scss';

Amplify.configure(config);

const App = props => {
  const [stateEvents, dispatchEvents] = useReducer(eventsReducer, initialStateEvents);
  const [stateGuests, dispatchGuests] = useReducer(guestReducer, initialStateGuests);
  const [stateGlobal, dispatchGlobal] = useReducer(globalReducer, initialGlobalState);
  const [user, setCurrentUser] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  const updateCurrentUser = async user => {
    if (user) {
      setCurrentUser(user);
    }
    try {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user);
      setLoaded(true);
    } catch (err) {
      setCurrentUser(null);
      setLoaded(true);
    }
  };

  useEffect(() => {
    updateCurrentUser();
    Hub.listen('auth', ({ channel, payload }) => {
      console.log('auth', payload.event);
      if (channel === 'auth' && ['signIn', 'signOut', 'cognitoHostedUI'].includes(payload.event)) {
        updateCurrentUser(payload.data);
      }
    });
  }, []);

  return (
    <div className="App">
      <Context.Provider
        value={{
          state: { ...stateEvents, ...stateGuests, ...stateGlobal },
          dispatchEvents,
          dispatchGuests,
          dispatchGlobal,
        }}
      >
        <UserContext.Provider
          value={{
            user,
            updateCurrentUser,
            isLoaded,
          }}
        >
          <Router />
        </UserContext.Provider>
      </Context.Provider>
    </div>
  );
};

export default App;
