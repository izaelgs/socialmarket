import { EmailService } from "../email/email.service";

export const emailServiceMock = {
  provide: EmailService,
  useValue: {
    sendEmail: jest.fn(),
  },
};
