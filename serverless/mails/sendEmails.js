const sgMail = require('@sendgrid/mail');
// const AWS = require('aws-sdk');
const { getSecretValue } = require('../utils/getSecretValue');
const constants = require('../constants/constants');
// const dbUtils = require('../utils/db.utils');

// const updateGuests = async ({ eventId }) => {
//   const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-2' });
//   try {
//     const params = {
//       TableName: constants.GUESTS_TABLE,
//       IndexName: constants.INDEX_EVENT_ID,
//       FilterExpression: 'eventId = :eventId',
//       ExpressionAttributeValues: {
//         ':eventId': eventId,
//       },
//     };

//     const results = await dynamoClient.scan(params).promise();
//     console.log(results);
//     const updated = results.Items.map(item => ({ ...item, emailSent: true }));
//     console.log('updated', updated);

//     await dbUtils.batchedAsync({
//       list: updated,
//       client: dynamoClient,
//       chunkSize: 25,
//       msDelayBetweenChunks: 1000,
//       table: constants.GUESTS_TABLE,
//     });
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

module.exports.handler = async ({ host, eventId, name, place, date, time, guests }) => {
  const parsedGuests = JSON.parse(guests);
  const key = await getSecretValue({
    secretName: constants.SECRET_NAME,
    key: constants.SECRET_KEYS.sendgrid,
  });
  sgMail.setApiKey(key);

  const guestWithEmailsToSend = parsedGuests.filter(guest => !guest.emailSent);

  console.log(JSON.stringify(guestWithEmailsToSend));

  const emails = guestWithEmailsToSend.map(guest => ({
    to: guest.email,
    from: 'admin@invited.events',
    templateId: constants.NEW_INVITE_EMAIL,
    dynamic_template_data: {
      firstName: guest.firstName,
      lastName: guest.lastName,
      url: guest.encrypted,
      host,
      name,
      place,
      date,
      time,
    },
  }));

  try {
    if (emails.length > 0) {
      await sgMail.send(emails);
      // await updateGuests({ eventId });
    }
    return 'ok';
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
