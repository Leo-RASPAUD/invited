export const actions = {
  deleteEventLoading: 'deleteEventLoading',
  deleteEventSuccess: 'deleteEventSuccess',
  updateEvents: 'updateEvents',
};

export const dispatchName = 'dispatchEvents';

export const reducer = (state, { payload, type }) => {
  switch (type) {
    case actions.deleteEventLoading: {
      return {
        ...state,
        events: state.events.map(event => {
          if (event.id === payload.id) return { ...event, loading: true };
          return event;
        }),
      };
    }
    case actions.deleteEventSuccess: {
      return {
        ...state,
        events: state.events.filter(event => event.id !== payload.id),
      };
    }
    case actions.updateEvents: {
      return {
        ...state,
        events: payload,
      };
    }
    default: {
      return state;
    }
  }
};
