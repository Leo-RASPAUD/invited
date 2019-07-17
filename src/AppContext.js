import React from 'react';

export const initialStateStyles = {
  styles: {
    background: '#fbfbfa',
    color: '#242430',
  },
};

export const initialStateGuests = {
  guests: [],
  guest: {},
};

export const initialStateEvents = {
  events: [],
  event: {},
};

export const initialStateGlobal = {
  errors: [],
  errorMessage: null,
  errorType: null,
  snackbarItems: [],
};

export const Context = React.createContext({
  state: { ...initialStateGuests, initialStateEvents, ...initialStateGlobal, ...initialStateStyles },
});
