const deleteEvent = {
  name: 'deleteEvent',
  mutation: `mutation deleteEvent($id: String!) {
    deleteEvent(id: $id)
}`,
};

export default { deleteEvent };
