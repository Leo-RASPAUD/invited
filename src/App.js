import React, { useReducer, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

import { Context, initialStateStyles, initialStateEvents, initialStateGuests, initialStateGlobal } from './AppContext';
import UserContext from './UserContext';
import { reducer as stylesReducer } from './reducers/stylesReducer';
import { reducer as eventsReducer } from './reducers/eventsReducer';
import { reducer as guestReducer } from './reducers/guestsReducer';
import { reducer as globalReducer } from './reducers/globalReducer';
import Router from './Router';

import './App.scss';
import Snackbar from './components/Snackbar';

const App = props => {
  const initialSessionStorage = JSON.parse(window.sessionStorage.getItem('invited-state'));
  const initialStyles = initialSessionStorage.styles || initialStateStyles;
  const initialEvents = {
    events: initialSessionStorage.events || initialStateEvents.events,
    event: initialSessionStorage.event || initialStateEvents.event,
  };
  const initialGuests = {
    guests: initialSessionStorage.guests || initialStateGuests.guests,
    guest: initialSessionStorage.guest || initialStateGuests.guest,
  };
  const initialGlobal = {
    errors: initialSessionStorage.errors || initialStateGlobal.errors,
    errorMessage: initialSessionStorage.errorMessage || initialStateGlobal.errorMessage,
    errorType: initialSessionStorage.errorType || initialStateGlobal.errorType,
    snackbarItems: initialSessionStorage.snackbarItems || initialStateGlobal.snackbarItems,
  };

  const [stateStyles, dispatchStyles] = useReducer(stylesReducer, initialStyles);
  const [stateEvents, dispatchEvents] = useReducer(eventsReducer, initialEvents);
  const [stateGuests, dispatchGuests] = useReducer(guestReducer, initialGuests);
  const [stateGlobal, dispatchGlobal] = useReducer(globalReducer, initialGlobal);
  const [appState, setAppState] = useState({
    user: {},
    isLoaded: false,
  });

  const updateCurrentUser = async user => {
    return new Promise(async resolve => {
      if (user) {
        setAppState({ user, isLoaded: true });
        resolve();
      } else {
        try {
          const newUser = await Auth.currentAuthenticatedUser();
          setAppState({ user: newUser, isLoaded: true });
          resolve();
        } catch (err) {
          setAppState({ user: null, isLoaded: true });
          resolve();
        }
      }
    });
  };

  useEffect(() => {
    updateCurrentUser();
  }, []);

  return (
    <div className="App">
      <Context.Provider
        value={{
          state: { ...stateEvents, ...stateGuests, ...stateGlobal, ...stateStyles },
          dispatchStyles,
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
          <div
            style={{
              minHeight: '100vh',
              transition: 'background .2s ease-in-out, color .2s ease-in-out',
              ...stateStyles.styles,
            }}
          >
            <Snackbar />
            <Router />
          </div>
        </UserContext.Provider>
      </Context.Provider>
    </div>
  );
};

export default App;
