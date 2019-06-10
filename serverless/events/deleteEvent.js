const utils = require('./events.db.utils');

module.exports.handler = async event => {
  const { userId, eventId } = event;
  const results = await utils.deleteEvent({ userId, eventId });
  console.log(results);
  return {};
};
