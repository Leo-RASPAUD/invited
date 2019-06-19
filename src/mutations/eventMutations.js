import { actions, dispatchName as dispatch } from '../reducers/eventsReducer';
import { actions as globalErrors, dispatchName as dispatchGlobal } from '../reducers/globalReducer';
import { lightEvent } from '../types/eventType';

const deleteEvent = {
  name: 'deleteEvent',
  actions: [{ name: actions.deleteEventSuccess, dispatch }],
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

export { deleteEvent, createEvent };
