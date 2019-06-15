// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc';
// const { getSecret } = require('../utils/crypto');
// // const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

// const key = 'JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmY';

const crypto = require('crypto');

const ENCRYPTION_KEY = 'JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmY'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

const test = () => {
  //   const result = encrypt(JSON.stringify({ a: 1, b: 2 }));
  const result = JSON.parse(decrypt('a8f50f9f059cf8984b3b06307af89b59:5f4c5a2bfa5854c05b47fa647434b302'));
  console.log(result);
};

test();

// module.exports = { decrypt, encrypt };
