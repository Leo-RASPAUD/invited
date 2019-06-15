import { actions, dispatchName } from '../reducers/eventsReducer';
import { lightEvent } from '../types/eventType';

const deleteEvent = {
  name: 'deleteEvent',
  actions: [{ name: actions.deleteEventSuccess, dispatch: dispatchName }],
  query: `mutation deleteEvent($id: String!) {
    deleteEvent(id: $id)
}`,
};

const createEvent = {
  name: 'createEvent',
  actions: [{ name: actions.createEvent, dispatch: dispatchName }],
  query: `mutation createEvent($name: String!, $host: String!, $type: String!, $place: String!, $time: String!, $date: String!) {
    createEvent(name: $name, host: $host, type: $type, place: $place, time: $time, date: $date) {
      ${lightEvent}
    }
}`,
};

export { deleteEvent, createEvent };
