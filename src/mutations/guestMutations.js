import { actions, dispatchName } from '../reducers/guestsReducer';
import guest from '../types/guestType';

const addGuest = {
  name: 'addGuest',
  actions: [{ name: actions.addGuest, dispatch: dispatchName }],
  query: `mutation addGuest($firstName: String!, $lastName: String!, $email: String!, $eventId: String!) {
      addGuest(firstName: $firstName, lastName: $lastName, email: $email, eventId: $eventId) {
        ${guest}
      }
  }`,
};

const deleteGuest = {
  name: 'deleteGuest',
  actions: [{ name: actions.deleteGuestSuccess, dispatch: dispatchName }],
  query: `mutation deleteGuest($id: String!) {
        deleteGuest(id: $id)
  }`,
};

const updateGuestInvitation = {
  name: actions.updateGuestInvitation,
  actions: [{ name: actions.updateGuestInvitation, dispatch: dispatchName }, { name: 'error', dispatch: dispatchName }],
  query: `mutation updateGuestInvitation($id: String!, $notes: String, $accepted: Boolean!) {
    updateGuestInvitation(id: $id, notes: $notes, accepted: $accepted) {
      ${guest}
    }
}`,
};

export { addGuest, deleteGuest, updateGuestInvitation };
