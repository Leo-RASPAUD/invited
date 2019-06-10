import event from '../types/event';

const deleteEvent = {
  name: 'deleteEvent',
  mutation: `mutation deleteEvent($id: String!) {
    deleteEvent(id: $id)
}`,
};
const createEvent = {
  name: 'createEvent',
  mutation: `mutation createEvent($name: String!) {
    createEvent(name: $name) {
      ${event}
    }
}`,
};

export default { deleteEvent, createEvent };
