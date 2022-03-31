import nodemailer from 'nodemailer';
import { mailConfig } from './mail.config';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailConfig.mail,
        pass: mailConfig.pass,
    },
});

const mailOptions = {
    from: 'bryantello2010@hotmail.com',
    to: 'bryantello2010@hotmail.com',
    subject: 'Prueba',
    text: 'COrreo enviado desde nodejs',
};

transporter.sendMail(mailOptions, (err) => {
    if (err) return console.log(err);
    console.log('Enviado');
});
