import event from '../types/event';
import { actions, dispatchName } from '../reducers/eventReducer';

const getEvents = {
  name: 'getEvents',
  action: actions.updateEvents,
  dispatch: dispatchName,
  query: `query getEvents {
    getEvents {
      ${event}
    }
}`,
};

export { getEvents };
