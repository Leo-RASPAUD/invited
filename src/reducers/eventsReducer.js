export const actions = {
  deleteEvent: 'deleteEvent',
  updateEvents: 'updateEvents',
  createEvent: 'createEvent',
  getEvent: 'getEvent',
  getEvents: 'getEvents',
  getEventLoading: 'getEventLoading',
  sendInvites: 'sendInvites',
};

export const dispatchName = 'dispatchEvents';

export const reducer = (state, { payload, type }) => {
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
