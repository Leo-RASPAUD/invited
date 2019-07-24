const sgMail = require('@sendgrid/mail');
const { getSecretValue } = require('../utils/getSecretValue');
const constants = require('../constants/constants');

module.exports.handler = async ({ content, from }) => {
  const key = await getSecretValue({
    secretName: constants.SECRET_NAME,
    key: constants.SECRET_KEYS.sendgrid,
  });
  sgMail.setApiKey(key);

  const users = ['leo.raspaud@gmail.com', 'garthmcrae@gmail.com'];
  try {
    await sgMail.send(
      users.map(user => ({
        to: user,
        from: 'admin@invited.events',
        templateId: constants.CONTACT_US_EMAIL,
        dynamic_template_data: {
          content,
          from,
        },
      })),
    );
    return 'ok';
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
