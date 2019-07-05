import React, { useReducer, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

import { Context, initialStateEvents, initialStateGuests, initialGlobalState } from './AppContext';
import UserContext from './UserContext';
import { reducer as eventsReducer } from './reducers/eventsReducer';
import { reducer as guestReducer } from './reducers/guestsReducer';
import { reducer as globalReducer } from './reducers/globalReducer';
import Router from './Router';

import './App.scss';

const App = props => {
  const [stateEvents, dispatchEvents] = useReducer(eventsReducer, initialStateEvents);
  const [stateGuests, dispatchGuests] = useReducer(guestReducer, initialStateGuests);
  const [stateGlobal, dispatchGlobal] = useReducer(globalReducer, initialGlobalState);
  const [appState, setAppState] = useState({
    user: {},
    isLoaded: false,
  });

  const updateCurrentUser = async user => {
    if (user) {
      setAppState({ user, isLoaded: true });
    } else {
      try {
        const newUser = await Auth.currentAuthenticatedUser();
        setAppState({ user: newUser, isLoaded: true });
      } catch (err) {
        setAppState({ user: null, isLoaded: true });
      }
    }
  };

  useEffect(() => {
    updateCurrentUser();
  }, []);

  Hub.listen('auth', ({ channel, payload: { event, data } }) => {
    if (['signIn', 'signOut'].includes(event)) {
      updateCurrentUser(data);
    }
  });

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
            user: appState.user,
            updateCurrentUser,
            isLoaded: appState.isLoaded,
          }}
        >
          <Router />
        </UserContext.Provider>
      </Context.Provider>
    </div>
  );
};

export default App;
