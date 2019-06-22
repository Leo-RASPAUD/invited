import guest from '../types/guestType';
import { baseEvent } from '../types/eventType';
import { actions as globalErrors, dispatchName as dispatchGlobal } from '../reducers/globalReducer';
import { actions, dispatchName as dispatch } from '../reducers/guestsReducer';

const decrypt = {
  authMode: 'AWS_IAM',
  name: actions.decrypt,
  actions: [{ name: actions.decrypt, dispatch }, { name: globalErrors.errorDecrypt, dispatch: dispatchGlobal }],
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
  actions: [{ name: actions.getGuests, dispatch }, { name: globalErrors.errorGetGuests, dispatch: dispatchGlobal }],
  query: `query getGuests($eventId: String!) {
    getGuests(eventId: $eventId) {
      ${guest}
    }
}`,
};

export { decrypt, getGuests };
