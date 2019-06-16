const AWS = require('aws-sdk');
const { decrypt } = require('../utils/crypto');
const { getSecretValue } = require('../utils/getSecretValue');

const constants = require('../constants/constants');
const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-2' });

const getEvent = async eventId => {
  const params = {
    TableName: constants.EVENTS_TABLE,
    Key: {
      id: eventId,
    },
  };
  const result = await dynamoClient.get(params).promise();
  return result.Item;
};

module.exports.handler = async ({ encrypted }) => {
  const key = await getSecretValue('publicPasswordSecret');
  try {
    const decrypted = decrypt({ data: encrypted, key });
    const guest = JSON.parse(decrypted);
    const event = await getEvent(guest.eventId);
    return {
      guest,
      event,
    };
  } catch (error) {
    console.log(error);
    return {
      event: {},
      guest: {},
    };
  }
};
