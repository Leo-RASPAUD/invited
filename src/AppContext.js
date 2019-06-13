import React from 'react';

export const initialState = {
  events: [],
};

export const Context = React.createContext({ state: initialState });
