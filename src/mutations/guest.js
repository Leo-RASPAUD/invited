import { actions, dispatchName } from '../reducers/guests';
import guest from '../types/guest';

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

export { addGuest, deleteGuest };
