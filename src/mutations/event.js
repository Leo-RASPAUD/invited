import { lightEvent } from '../types/event';

const deleteEvent = {
  name: 'deleteEvent',
  mutation: `mutation deleteEvent($id: String!) {
    deleteEvent(id: $id)
}`,
};
const createEvent = {
  name: 'createEvent',
  mutation: `mutation createEvent($name: String!, $host: String!, $type: String!, $place: String!, $time: String!, $date: String!) {
    createEvent(name: $name, host: $host, type: $type, place: $place, time: $time, date: $date) {
      ${lightEvent}
    }
}`,
};

export default { deleteEvent, createEvent };
