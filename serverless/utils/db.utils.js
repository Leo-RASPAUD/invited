const AWS = require('aws-sdk');
const constants = require('../constants/constants');

const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-2' });

const getEvents = async userId => {
  const params = {
    TableName: constants.EVENTS_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };
  const result = await dynamoClient.query(params).promise();
  if (result.Items) {
    const item = result.Items.shift();
    return item.events || [];
  }
  return null;
};

module.exports = {
  getEvents,
};
