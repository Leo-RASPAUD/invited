import { event } from '../types/eventType';
import { actions, dispatchName as dispatch } from '../reducers/eventsReducer';
import { actions as actionsGuests, dispatchName as dispatchGuest } from '../reducers/guestsReducer';
import { actions as globalActions, dispatchName as dispatchGlobal } from '../reducers/globalReducer';

const getEvents = {
  name: actions.getEvents,
  actions: [{ name: actions.updateEvents, dispatch }, { name: globalActions.errorGetEvents, dispatch: dispatchGlobal }],
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
    { name: globalActions.errorGetEvent, dispatch: dispatchGlobal },
  ],
  query: `query getEvent($id: String!) {
    getEvent(id: $id) {
      ${event}
    }
}`,
};

const sendInvites = {
  name: actions.sendInvites,
  actions: [
    { name: globalActions.errorSendInvites, dispatch: dispatchGlobal },
    {
      name: globalActions.snackbarSendInvitesSuccess,
      dispatch: dispatchGlobal,
      customMessage: 'Invites sent successfully',
    },
  ],
  query: `query sendInvites( $eventId: String!, $name: String!, $type: String!, $place: String!, $date: String!, $host: String!, $guests: String!) {
    sendInvites(eventId: $eventId, name: $name, type: $type, place: $place, date: $date, host: $host, guests: $guests)
}`,
};

export { getEvents, getEvent, sendInvites };
