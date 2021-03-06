import reducerState from './reducerState';
import uuid from 'uuid/v4';
import errorTypes from '../constants/errorTypes';

export const actions = {
  resetErrors: 'resetErrors',
  errorCreateEvent: 'errorCreateEvent',
  errorEditEvent: 'errorEditEvent',
  errorGetEvents: 'errorGetEvents',
  errorGetEvent: 'errorGetEvent',
  errorAddGuest: 'errorAddGuest',
  errorDeleteGuest: 'errorDeleteGuest',
  errorDecrypt: 'errorDecrypt',
  errorUpdateGuestInvitation: 'errorUpdateGuestInvitation',
  errorDeleteEvent: 'errorDeleteEvent',
  errorSendInvites: 'errorSendInvites',
  errorGetGuests: 'errorGetGuests',
  errorContactUs: 'errorContactUs',
  errorResendInvite: 'errorResendInvite',

  newSnackbarItem: 'newSnackbarItem',
  closeSnackbarItem: 'closeSnackbarItem',
};

export const dispatchName = 'dispatchGlobal';

export const reducerSwitch = (state, { payload, type, customMessage }) => {
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
    case actions.errorContactUs: {
      return {
        ...state,
        errorType: errorTypes.contactUs,
        errorMessage: 'Error while trying to send the email.',
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
    case actions.errorEditEvent: {
      return {
        ...state,
        errorType: errorTypes.editEvent,
        errorMessage: 'Error while trying to edit the event.',
        errors: payload.errors,
      };
    }
    case actions.errorResendInvite: {
      return {
        ...state,
        errorType: errorTypes.errorResendInvite,
        errorMessage: 'Error while resending the invite.',
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
    case actions.newSnackbarItem: {
      return {
        ...state,
        snackbarItems: state.snackbarItems.concat({ message: customMessage, id: uuid() }),
      };
    }
    case actions.closeSnackbarItem: {
      return {
        ...state,
        snackbarItems: state.snackbarItems.filter(item => item.id !== payload),
      };
    }
    default: {
      return state;
    }
  }
};

export const reducer = (state, params) => {
  return reducerState(state, params, reducerSwitch);
};
