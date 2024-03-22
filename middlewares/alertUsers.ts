require('dotenv').config()
import nodemailer from 'nodemailer'
import {contentSelector} from './mailContent'
  
interface project{
    link: string,
    name: string,
    reason: string
}

interface content{
    subject:string,
    html:string
}

export async function alertUsers(applierMail:string, purpose:string, applierName:string, project:project) {
    const content = contentSelector(purpose, applierName, project)
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PW
        }
    });
    
    const mailOptions = {
        from : process.env.NODEMAILER_USER,
        to: applierMail,
        subject: (await content).subject,
        text: (await content).html
    };

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Email sent successfuly');
        }
    })
}