import event from '../types/event';

const getEvents = {
  name: 'getEvents',
  query: `query getEvents {
    getEvents {
      ${event}
    }
}`,
};

export { getEvents };
