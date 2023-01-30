require('dotenv').config();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});


const mandarCorreo = (userId, destinatario) => {

    console.log(userId);
    
    const cuerpoHtml = `
        clicka en el link para confirmar esta cuenta de correo 
        <a href="http://localhost:8090/api/activarusuario/${(userId)}>pincha aquí beibi</a>
    `;

    const asunto = 'Confirmación de cuenta de correo electrónico';

    mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: destinatario,
        subject: asunto,
        html: cuerpoHtml
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) throw error;
        else console.log('Email sent: ' + info.response);
    });
}
  
module.exports = mandarCorreo;

// mandarCorreo(4, 'marioferestevez@gmail.com');