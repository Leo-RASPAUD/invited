// Load the AWS SDK
const AWS = require('aws-sdk');
const region = 'ap-southeast-2';

const client = new AWS.SecretsManager({
  region: region,
});

const getSecretValue = async ({ secretName, key }) => {
  const result = await client.getSecretValue({ SecretId: secretName }).promise();
  let secret = '';
  if ('SecretString' in result) {
    secret = result.SecretString;
  } else {
    let buff = new Buffer(result.SecretBinary, 'base64');
    secret = buff.toString('ascii');
  }
  return JSON.parse(secret)[key];
};

module.exports = {
  getSecretValue,
};
