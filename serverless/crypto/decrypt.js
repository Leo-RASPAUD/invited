const { decrypt } = require('../utils/crypto');
const { getSecretValue } = require('../utils/getSecretValue');

module.exports.handler = async ({ encrypted }) => {
  const key = await getSecretValue('publicPasswordSecret');
  try {
    const decrypted = decrypt({ data: encrypted, key });
    return JSON.parse(decrypted);
  } catch (error) {
    console.log(error);
  }
};
