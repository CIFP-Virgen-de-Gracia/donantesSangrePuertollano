require('dotenv').config();
const crypto = require('crypto');

class Crypto {

   constructor() {
      this.algorithm = process.env.CRYPTO_ALGORITHM;
      this.key = Buffer.from(process.env.CRYPTO_KEY, 'hex');
   }

   encrypt = (text, iv) => {
      let cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), iv.toString('hex').slice(0, 16));
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
