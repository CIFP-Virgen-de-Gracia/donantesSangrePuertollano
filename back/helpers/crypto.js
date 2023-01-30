require('dotenv').config();
const crypto = require('crypto');

class Crypto {

   constructor() {
      this.algorithm = process.env.CRYPTO_ALGORITHM;
      this.key = Buffer.from(process.env.CRYPTO_KEY, 'hex');
   }

   encrypt = (text) => {
      const iv = crypto.randomBytes(16);
      let cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
   }
   
   decrypt = (text) => {
      let iv = Buffer.from(text.iv, 'hex');
      let encryptedText = Buffer.from(text.encryptedData, 'hex');
      let decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key), iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
   }
}

const enDeCrypt = new Crypto();

module.exports = enDeCrypt;

// const user = {
//    passwd: 'd304529864df1eb432fe00b9b81ce076',
//   iv: '00467b279f298619ea6ab35d79714e96'
// }

// const a = enDeCrypt.encrypt('1234');
// console.log(a);

// console.log(enDeCrypt.decrypt({encryptedData: user.passwd, iv: user.iv}));
// console.log(enDeCrypt.decrypt(a));