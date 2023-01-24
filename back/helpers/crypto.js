require('dotenv');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
}

const decrypt = (text) => {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

module.exports = [
    encrypt,
    decrypt
]

const en = encrypt('1234');

console.log(encrypt('1234'));


console.log('aaaaaaaaaaaaaaaaaaaa');
console.log(crypto.randomBytes(16));
console.log('eeeeeeeeeeeeeeeee');

const de = decrypt(en);


console.log(de);