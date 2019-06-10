const utils = require('./events.db.utils');

module.exports.handler = async event => {
  const { userId } = event;
  const events = await utils.getEvents(userId);
  return events || [];
};
