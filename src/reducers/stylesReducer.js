import reducerState from './reducerState';

export const actions = {
  updateStyles: 'updateStyles',
};

export const dispatchName = 'dispatchStyles';

export const reducerSwitch = (state, { payload, type }) => {
  switch (type) {
    case actions.updateStyles: {
      console.log(payload);
      return {
        ...state,
        styles: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const reducer = (state, { payload, type }) => {
  return reducerState(state, { payload, type }, reducerSwitch);
};
