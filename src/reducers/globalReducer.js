import errorTypes from '../constants/errorTypes';

export const actions = {
  resetErrors: 'resetErrors',
  errorCreateEvent: 'errorCreateEvent',
  errorGetEvents: 'errorGetEvents',
  errorGetEvent: 'errorGetEvent',
  errorAddGuest: 'errorAddGuest',
  errorDeleteGuest: 'errorDeleteGuest',
  errorDecrypt: 'errorDecrypt',
  errorUpdateGuestInvitation: 'errorUpdateGuestInvitation',
  errorDeleteEvent: 'errorDeleteEvent',
  errorSendInvites: 'errorSendInvites',
  errorGetGuests: 'errorGetGuests',
};

export const dispatchName = 'dispatchGlobal';

export const reducer = (state, { payload, type }) => {
  switch (type) {
    case actions.resetErrors: {
      return {
        ...state,
        errorType: '',
        errorMessage: null,
        errors: [],
      };
    }
    case actions.errorCreateEvent: {
      return {
        ...state,
        errorType: errorTypes.createEvent,
        errorMessage: 'Error while trying to create an event.',
        errors: payload.errors,
      };
    }
    case actions.errorGetEvents: {
      return {
        ...state,
        errorType: errorTypes.getEvents,
        errorMessage: 'Error while trying to get your events.',
        errors: payload.errors,
      };
    }
    case actions.errorGetEvent: {
      return {
        ...state,
        errorType: errorTypes.getEvent,
        errorMessage: 'Error while trying to get your event.',
        errors: payload.errors,
      };
    }
    case actions.errorAddGuest: {
      return {
        ...state,
        errorType: errorTypes.addGuest,
        errorMessage: 'Error while trying to add a guest.',
        errors: payload.errors,
      };
    }
    case actions.errorDeleteGuest: {
      return {
        ...state,
        errorType: errorTypes.deleteGuest,
        errorMessage: 'Error while trying to delete a guest.',
        errors: payload.errors,
      };
    }
    case actions.errorDecrypt: {
      return {
        ...state,
        errorType: errorTypes.decrypt,
        errorMessage: 'Error while trying to get your event.',
        errors: payload.errors,
      };
    }
    case actions.errorUpdateGuestInvitation: {
      return {
        ...state,
        errorType: errorTypes.updateGuestInvitation,
        errorMessage: 'Error while trying to send your confirmation.',
        errors: payload.errors,
      };
    }
    case actions.errorDeleteEvent: {
      return {
        ...state,
        errorType: errorTypes.deleteEvent,
        errorMessage: 'Error while trying to delete the event.',
        errors: payload.errors,
      };
    }
    case actions.errorSendInvites: {
      return {
        ...state,
        errorType: errorTypes.sendInvites,
        errorMessage: 'Error while trying to send the invites.',
        errors: payload.errors,
      };
    }
    case actions.errorGetGuests: {
      return {
        ...state,
        errorType: errorTypes.getGuests,
        errorMessage: 'Error while trying to get guests.',
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
