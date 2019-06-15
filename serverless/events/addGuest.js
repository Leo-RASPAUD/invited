const { encrypt } = require('../utils/crypto');
const { getSecretValue } = require('../utils/getSecretValue');

module.exports.handler = async ({ guest, eventId }) => {
  const key = await getSecretValue('publicPasswordSecret');
  const encrypted = encrypt({ key, data: guest });
  console.log(eventId, encrypted);
  return [];
};
