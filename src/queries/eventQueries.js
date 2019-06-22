import { event } from '../types/eventType';
import { actions, dispatchName as dispatch } from '../reducers/eventsReducer';
import { actions as actionsGuests, dispatchName as dispatchGuest } from '../reducers/guestsReducer';
import { actions as globalErrors, dispatchName as dispatchGlobal } from '../reducers/globalReducer';

const getEvents = {
  name: actions.getEvents,
  actions: [{ name: actions.updateEvents, dispatch }, { name: globalErrors.errorGetEvents, dispatch: dispatchGlobal }],
  query: `query getEvents {
    getEvents {
      ${event}
    }
}`,
};

const getEvent = {
  name: actions.getEvent,
  actions: [
    { name: actions.getEvent, dispatch },
    { name: actionsGuests.updateGuests, dispatch: dispatchGuest, field: 'guests' },
    { name: globalErrors.errorGetEvent, dispatch: dispatchGlobal },
  ],
  query: `query getEvent($id: String!) {
    getEvent(id: $id) {
      ${event}
    }
}`,
};

export { getEvents, getEvent };
