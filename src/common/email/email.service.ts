import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

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
  }
}
