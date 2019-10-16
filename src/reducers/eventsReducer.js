import reducerState from './reducerState';

export const actions = {
  deleteEvent: 'deleteEvent',
  updateEvents: 'updateEvents',
  createEvent: 'createEvent',
  getEvent: 'getEvent',
  getEvents: 'getEvents',
  getEventLoading: 'getEventLoading',
  sendInvites: 'sendInvites',
  editEvent: 'editEvent',
  contactUs: 'contactUs',
};

export const dispatchName = 'dispatchEvents';

const reducerSwitch = (state, { payload, type }) => {
  switch (type) {
    case actions.deleteEvent: {
      return {
        ...state,
        events: state.events.filter(event => event.id !== payload),
      };
    }
    case actions.updateEvents: {
      return {
        ...state,
        events: payload,
      };
    }
    case actions.createEvent: {
      return {
        ...state,
        events: state.events.concat(payload),
      };
    }
    case actions.getEvent: {
      return {
        ...state,
        event: payload || {},
      };
    }
    case 'error': {
      return {
        ...state,
        event: {},
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
