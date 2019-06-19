import { lightEvent, event } from '../types/eventType';
import { actions, dispatchName as dispatch } from '../reducers/eventsReducer';
import { actions as actionsGuests, dispatchName as dispatchGuest } from '../reducers/guestsReducer';

const getEvents = {
  name: actions.getEvents,
  actions: [{ name: actions.updateEvents, dispatch }],
  query: `query getEvents {
    getEvents {
      ${lightEvent}
    }
}`,
};

const getEvent = {
  name: actions.getEvent,
  actions: [
    { name: actions.getEvent, dispatch },
    { name: actionsGuests.updateGuests, dispatch: dispatchGuest, field: 'guests' },
    { name: 'error', dispatch },
  ],
  query: `query getEvent($id: String!) {
    getEvent(id: $id) {
      ${event}
    }
}`,
};

export { getEvents, getEvent };
