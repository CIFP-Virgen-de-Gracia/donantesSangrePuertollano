const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
let key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const keyString = key.toString('hex');
const keyBack = Buffer.from(keyString, 'hex');



//Encrypting text
function encrypt(text) {
    key = keyBack;
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

console.log(encrypt('ey'));


// const keyString = key.toString('hex');
// const keyBack = Buffer.from(keyString, 'hex');

console.log('key => ', key);
console.log('keyString => ', keyString);
console.log('keyBack => ', keyBack);

