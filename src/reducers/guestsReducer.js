export const actions = {
  addGuest: 'addGuest',
  updateGuests: 'updateGuests',
  deleteGuest: 'deleteGuest',
  decrypt: 'decrypt',
  updateGuestInvitation: 'updateGuestInvitation',
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
    case actions.deleteGuest: {
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
    case actions.updateGuestInvitation: {
      return {
        ...state,
        guests: state.guests.map(guest => {
          if (guest.id === payload.id) {
            return {
              ...guest,
              ...payload,
            };
          }
          return payload;
        }),
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
