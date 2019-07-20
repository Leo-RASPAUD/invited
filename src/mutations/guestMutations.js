import { actions, dispatchName as dispatch } from '../reducers/guestsReducer';
import { actions as globalErrors, dispatchName as dispatchGlobal } from '../reducers/globalReducer';
import guest from '../types/guestType';

const addGuest = {
  name: 'addGuest',
  actions: [{ name: actions.addGuest, dispatch }, { name: globalErrors.errorAddGuest, dispatch: dispatchGlobal }],
  query: `mutation addGuest($firstName: String!, $lastName: String!, $email: String!, $eventId: String!) {
      addGuest(firstName: $firstName, lastName: $lastName, email: $email, eventId: $eventId) {
        ${guest}
      }
  }`,
};

const deleteGuest = {
  name: 'deleteGuest',
  actions: [{ name: actions.deleteGuest, dispatch }, { name: globalErrors.errorDeleteGuest, dispatch: dispatchGlobal }],
  query: `mutation deleteGuest($id: String!) {
        deleteGuest(id: $id)
  }`,
};

const updateGuestInvitation = {
  authMode: 'AWS_IAM',
  name: actions.updateGuestInvitation,
  actions: [
    { name: actions.updateGuestInvitation, dispatch },
    { name: globalErrors.errorUpdateGuestInvitation, dispatch: dispatchGlobal },
  ],
  query: `mutation updateGuestInvitation($id: String!, $notes: String, $accepted: Boolean!, $participants: String!, ) {
    updateGuestInvitation(id: $id, notes: $notes, accepted: $accepted, participants: $participants) {
      ${guest}
    }
}`,
};

export { addGuest, deleteGuest, updateGuestInvitation };
