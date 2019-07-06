import { actions, dispatchName as dispatch } from '../reducers/eventsReducer';
import { actions as globalErrors, dispatchName as dispatchGlobal } from '../reducers/globalReducer';
import { lightEvent } from '../types/eventType';

const deleteEvent = {
  name: 'deleteEvent',
  actions: [{ name: actions.deleteEvent, dispatch }, { name: globalErrors.errorDeleteEvent, dispatch: dispatchGlobal }],
  query: `mutation deleteEvent($id: String!) {
    deleteEvent(id: $id)
}`,
};

const createEvent = {
  name: 'createEvent',
  actions: [{ name: actions.createEvent, dispatch }, { name: globalErrors.errorCreateEvent, dispatch: dispatchGlobal }],
  query: `mutation createEvent($name: String!, $host: String!, $type: String!, $place: String!, $time: String!, $date: String!) {
    createEvent(name: $name, host: $host, type: $type, place: $place, time: $time, date: $date) {
      ${lightEvent}
    }
}`,
};
const editEvent = {
  name: 'editEvent',
  actions: [{ name: actions.editEvent, dispatch }, { name: globalErrors.errorEditEvent, dispatch: dispatchGlobal }],
  query: `mutation editEvent($name: String!, $host: String!, $type: String!, $place: String!, $time: String!, $date: String!, $eventId: String!) {
    editEvent(name: $name, host: $host, type: $type, place: $place, time: $time, date: $date, eventId: $eventId) {
      ${lightEvent}
    }
}`,
};

export { deleteEvent, createEvent, editEvent };
