const sgMail = require('@sendgrid/mail');
const { getSecretValue } = require('../utils/getSecretValue');
const constants = require('../constants/constants');

module.exports.handler = async ({ host, eventId, name, place, date, time, guests }) => {
  const parsedGuests = JSON.parse(guests);
  const key = await getSecretValue({
    secretName: constants.SECRET_NAME,
    key: constants.SECRET_KEYS.sendgrid,
  });
  sgMail.setApiKey(key);

  const emails = parsedGuests.map(guest => ({
    to: guest.email,
    from: 'admin@invited.events',
    templateId: constants.NEW_INVITE_EMAIL,
    dynamic_template_data: {
      firstName: guest.firstName,
      lastName: guest.lastName,
      eventId,
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
    }
    return 'ok';
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
