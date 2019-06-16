export const actions = {
  addGuest: 'addGuest',
  updateGuests: 'updateGuests',
  deleteGuestError: 'deleteGuestError',
  deleteGuestLoading: 'deleteGuestLoading',
  deleteGuestSuccess: 'deleteGuestSuccess',
  decrypt: 'decrypt',
};

export const dispatchName = 'dispatchGuests';

export const reducer = (state, { payload, type }) => {
  switch (type) {
    case actions.updateGuests: {
      return {
        ...state,
        guests: payload,
      };
    }
    case actions.addGuest: {
      return {
        ...state,
        guests: state.guests.concat(payload),
      };
    }
    case actions.deleteGuestLoading: {
      return {
        ...state,
        guests: state.guests.map(guest => {
          if (guest.id === payload.id) return { ...guest, loading: true };
          return guest;
        }),
      };
    }
    case actions.deleteGuestError: {
      return {
        ...state,
        guests: state.guests.map(guest => {
          if (guest.id === payload.id) return { ...guest, loading: false };
          return guest;
        }),
      };
    }
    case actions.deleteGuestSuccess: {
      return {
        ...state,
        guests: state.guests.filter(guest => guest.id !== payload),
      };
    }
    case actions.decrypt: {
      return {
        ...state,
        guest: payload.guest,
        event: payload.event,
      };
    }
    case 'error': {
      return {
        ...state,
        guests: [],
        guest: {},
      };
    }
    default: {
      return state;
    }
  }
};
