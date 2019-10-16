import guest from '../types/guestType';
import { baseEvent } from '../types/eventType';
import { actions as globalActions, dispatchName as dispatchGlobal } from '../reducers/globalReducer';
import { actions, dispatchName as dispatch } from '../reducers/guestsReducer';

const decrypt = {
  name: actions.decrypt,
  actions: [{ name: actions.decrypt, dispatch }, { name: globalActions.errorDecrypt, dispatch: dispatchGlobal }],
  query: `query decrypt($encrypted: String!) {
    decrypt(encrypted: $encrypted) {
      guest {
        ${guest}
      }
      event {
        ${baseEvent}
      }
    }
}`,
};

const getGuests = {
  name: actions.getGuests,
  actions: [{ name: actions.getGuests, dispatch }, { name: globalActions.errorGetGuests, dispatch: dispatchGlobal }],
  query: `query getGuests($eventId: String!) {
    getGuests(eventId: $eventId) {
      ${guest}
    }
}`,
};

const resendInvite = {
  name: actions.resendInvite,
  actions: [
    { name: actions.resendInvite, dispatch },
    {
      name: globalActions.newSnackbarItem,
      dispatch: dispatchGlobal,
      customMessage: 'Invite resent successfully',
    },
    { name: globalActions.errorResendInvite, dispatch: dispatchGlobal },
  ],
  query: `query sendInvites($time: String!, $eventId: String!, $name: String!, $type: String!, $place: String!, $date: String!, $host: String!, $guests: String!, $details: String) {
    sendInvites(time: $time, eventId: $eventId, name: $name, type: $type, place: $place, date: $date, host: $host, guests: $guests, details: $details)
}`,
};

export { decrypt, getGuests, resendInvite };
