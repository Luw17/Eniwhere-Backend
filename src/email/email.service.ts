import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    
    async sendEmail(data: { email: string, aparelho: string, marca: string, modelo: string, problema: string }): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-password'
            }
        });
        const mailOptions = {
            from: 'youremail@gmail.com',
            to: data.email,
            subject: 'Sua ordem de servi o',
            text: `Seu aparelho ${data.aparelho} da marca ${data.marca} modelo ${data.modelo} foi registrado com o problema: ${data.problema}`
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });
    }
}