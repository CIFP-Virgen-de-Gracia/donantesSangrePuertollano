require('dotenv').config();
const nodemailer = require('nodemailer');

//Mario
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    },
    tls:{rejectUnauthorized:false}
});

//Mario
const mandarCorreoActivacion = (userId, destinatario, ruta) => {

    const cuerpoHtml = `Pincha en el <a href="http://${process.env.HOST}:${process.env.PORT}/api/${ruta}/${userId}/">link</a> para confirmar tu correo`;

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


const mandarCorreo = (destinatario, contenido) => {
    
    mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: destinatario,
        subject: contenido.asunto,
        html: contenido.cuerpoHtml
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) throw error;
    });
}
        
module.exports = {
    mandarCorreoActivacion,
    mandarCorreo
}

