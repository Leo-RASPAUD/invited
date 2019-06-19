import React from 'react';

export const initialStateGuests = {
  guests: [],
  guest: {},
};

export const initialStateEvents = {
  events: [],
  event: {},
};

export const initialGlobalState = {
  errors: [],
  errorMessage: '',
};

export const Context = React.createContext({
  state: { ...initialStateGuests, initialStateEvents, ...initialGlobalState },
});
