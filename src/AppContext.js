import React from 'react';

export const initialState = {
  events: [],
  event: {},
};

export const Context = React.createContext({ state: initialState });
