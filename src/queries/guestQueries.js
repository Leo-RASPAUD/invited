import guest from '../types/guestType';
import { baseEvent } from '../types/eventType';
import { actions, dispatchName } from '../reducers/guestsReducer';

const decrypt = {
  authMode: 'AWS_IAM',
  name: 'decrypt',
  actions: [{ name: actions.decrypt, dispatch: dispatchName }, { name: 'error', dispatch: dispatchName }],
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

export { decrypt };
