import event from '../types/event';

const getEvents = {
  name: 'getEvents',
  query: `query getEvents($userId: String!) {
    getEvents(userId: $userId) {
      ${event}
    }
}`,
};

export { getEvents };
