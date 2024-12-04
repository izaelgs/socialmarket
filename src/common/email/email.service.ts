import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
<<<<<<< HEAD
=======
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
>>>>>>> 18e40cf9b897dd866e82c93cf7754fcd6250c8da

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
<<<<<<< HEAD
      service: "Gmail",
      auth: {
        user: "izael.dev@gmail.com",
        pass: process.env.SMTP_GMAIL_APP_KEY,
=======
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
>>>>>>> 18e40cf9b897dd866e82c93cf7754fcd6250c8da
      },
    });
  }

<<<<<<< HEAD
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: "Social Market <izael.dev@gmail.com>",
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
=======
  private async compileTemplate(templateName: string, data: any) {
    const templatePath = path.join(
      process.cwd(),
      "src",
      "common",
      "email",
      "templates",
      `${templateName}.hbs`,
    );
    const template = fs.readFileSync(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(data);
  }

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    data: any,
  ) {
    const html = await this.compileTemplate(templateName, data);

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
>>>>>>> 18e40cf9b897dd866e82c93cf7754fcd6250c8da
  }
}
