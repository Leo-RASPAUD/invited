import { lightEvent, event } from '../types/event';
import { actions, dispatchName } from '../reducers/eventReducer';

const getEvents = {
  name: 'getEvents',
  action: actions.updateEvents,
  dispatch: dispatchName,
  query: `query getEvents {
    getEvents {
      ${lightEvent}
    }
}`,
};

const getEvent = {
  name: 'getEvent',
  action: actions.getEvent,
  dispatch: dispatchName,
  query: `query getEvent($id: String!) {
    getEvent(id: $id) {
      ${event}
    }
}`,
};

export { getEvents, getEvent };
