const AWS = require('aws-sdk');
const { encrypt } = require('../utils/crypto');
const { getSecretValue } = require('../utils/getSecretValue');
const uuidv4 = require('uuid/v4');

const constants = require('../constants/constants');
const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-2' });

const createGuest = data => {
  return dynamoClient
    .put({
      TableName: constants.GUESTS_TABLE,
      ReturnValues: 'ALL_OLD',
      Item: data,
    })
    .promise();
};

module.exports = {
  createGuest,
};

module.exports.handler = async ({ eventId, ...rest }) => {
  const key = await getSecretValue('publicPasswordSecret');
  const encrypted = encrypt({ key, data: JSON.stringify(rest) });
  const guest = { eventId, encrypted, id: uuidv4(), ...rest };
  try {
    await createGuest(guest);
    return guest;
  } catch (error) {
    return {};
  }
};
