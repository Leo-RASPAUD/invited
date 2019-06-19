export const actions = {
  errorCreateEvent: 'errorCreateEvent',
};

export const dispatchName = 'dispatchGlobal';

export const reducer = (state, { payload, type }) => {
  switch (type) {
    case actions.errorCreateEvent: {
      return {
        ...state,
        errorMessage: 'Error while trying to create an event',
        errors: payload.errors,
      };
    }
    case 'error': {
      return {
        ...state,
        errors: payload.errors,
        errorMessage: 'Something went wrong!',
      };
    }
    default: {
      return state;
    }
  }
};
