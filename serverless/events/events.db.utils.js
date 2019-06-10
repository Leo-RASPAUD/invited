const AWS = require('aws-sdk');
const constants = require('../constants/constants');

const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-2' });

const getUser = async userId => {
  const params = {
    TableName: constants.EVENTS_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };
  const result = await dynamoClient.query(params).promise();
  if (result.length > 0) {
    return result.Items.shift();
  }
  return null;
};

const getEvents = async userId => {
  const params = {
    TableName: constants.EVENTS_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };
  const result = await dynamoClient.query(params).promise();
  console.log(result);
  if (result.Items) {
    const item = result.Items.shift();
    return item.events || [];
  }
  return null;
};

const updateUser = async user => {
  const params = {
    TableName: constants.EVENTS_TABLE,
    Item: user,
  };

  const result = await dynamoClient.put(params).promise();
  return result;
};

const deleteEvent = async ({ userId, eventId }) => {
  const user = await getUser(userId);
  console.log(user);
  if (!user || !user.events) return null;
  const { events } = user.events;

  const updatedEvents = events.filter(event => event.id !== eventId);
  const result = await updateUser({ ...user, events: updatedEvents });
  console.log(result);
  return result;
};

module.exports = {
  getEvents,
  deleteEvent,
};
