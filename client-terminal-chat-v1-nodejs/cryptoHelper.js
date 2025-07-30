const crypto = require('crypto');

function getKeyFromPassword(password) {
  return crypto.scryptSync(password, 'chat_salt', 32);
}

function encrypt(text, password) {
  const key = getKeyFromPassword(password);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]).toString('hex');
}

function decrypt(encrypted, password) {
  try {
    const key = getKeyFromPassword(password);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]).toString();
  } catch {
    return '[Wrong Key or Corrupted Message]';
  }
}

module.exports = { encrypt, decrypt };
