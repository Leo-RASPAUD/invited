const sgMail = require('@sendgrid/mail');
const { getSecretValue } = require('../utils/getSecretValue');
const constants = require('../constants/constants');

module.exports.handler = async ({ Records }) => {
  const key = await getSecretValue({
    secretName: constants.SECRET_NAME,
    key: constants.SECRET_KEYS.sendgrid,
  });
  sgMail.setApiKey(key);

  const emails = [];
  for (let i = 0; i < Records.length; i++) {
    const element = Records[i];
    if (element.eventName === 'INSERT') {
      const email = element.dynamodb.NewImage.email.S;
      emails.push({
        to: email,
        from: 'admin@invited.events',
        subject: "You've been invited to a new event!",
        text: 'Example text',
        html: `<h1>Hello ${email}!</h1><div><strong>Your BFF has invited you to this awesome event, please visit the link below <todo></strong></div>`,
      });
    }
  }

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
