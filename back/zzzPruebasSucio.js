const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
let key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const keyString = key.toString('hex');
const keyBack = Buffer.from(keyString, 'hex');

const md5 = require('blueimp-md5');


//Encrypting text
function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');

   console.log('1');
   console.log(iv);

   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   console.log('2');
   console.log(encryptedText);

   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   console.log('3');
   console.log(decipher);

   let decrypted = decipher.update(encryptedText);
   console.log('4');
   console.log(decrypted);

   decrypted = Buffer.concat([decrypted, decipher.final()]);
   console.log('5');
   console.log(decrypted);
   return decrypted.toString();
}

// console.log(encrypt('ey'));

const user = {
   passwd: 'ea973437c1aa47b188f8e8eeb0d36e5f',
   iv: '9ae645bf7c4ea3670986eeb030b5a797'
}

// const keyString = key.toString('hex');
// const keyBack = Buffer.from(keyString, 'hex');

// console.log('key => ', key);
// console.log('keyString => ', keyString);
// console.log('keyBack => ', keyBack);

// console.log({iv: user.iv, encryptedData:user.passwd});

// const a = encrypt('1234');
// console.log(a);

// console.log(decrypt({iv: user.iv, encryptedData:user.passwd}));

console.log(md5('1234'));