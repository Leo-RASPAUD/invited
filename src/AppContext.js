import React from 'react';

export const initialStateGuests = {
  guests: [],
  guest: {},
};

export const initialStateEvents = {
  events: [],
  event: {},
};

export const Context = React.createContext({ state: { ...initialStateGuests, initialStateEvents } });
