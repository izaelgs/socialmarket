import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "izael.dev@gmail.com",
        pass: process.env.SMTP_GMAIL_APP_KEY,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: "Social Market <izael.dev@gmail.com>",
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
