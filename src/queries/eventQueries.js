import { lightEvent, event } from '../types/eventType';
import { actions, dispatchName } from '../reducers/eventsReducer';
import { actions as actionsGuests, dispatchName as dispatchGuest } from '../reducers/guestsReducer';

const getEvents = {
  name: 'getEvents',
  actions: [{ name: actions.updateEvents, dispatch: dispatchName }],
  query: `query getEvents {
    getEvents {
      ${lightEvent}
    }
}`,
};

const getEvent = {
  name: 'getEvent',
  actions: [
    { name: actions.getEvent, dispatch: dispatchName },
    { name: actionsGuests.updateGuests, dispatch: dispatchGuest, field: 'guests' },
  ],
  query: `query getEvent($id: String!) {
    getEvent(id: $id) {
      ${event}
    }
}`,
};

export { getEvents, getEvent };
