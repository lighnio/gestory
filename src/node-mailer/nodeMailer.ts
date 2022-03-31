import nodemailer from 'nodemailer';
import { mailConfig } from './mail.config';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailConfig.mail,
        pass: mailConfig.pass,
    },
});

// Basic structure
const mailOptions = {
    from: 'bryantello2010@hotmail.com',
    to: 'bryantello2010@hotmail.com',
    subject: 'Prueba',
    text: 'COrreo enviado desde nodejs',
};
