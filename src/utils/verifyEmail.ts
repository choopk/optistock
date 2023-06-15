import nodemailer from "nodemailer";
import { nodemailerServer } from "./constant";

export async function verifyEmail(to: string, url: string) {
  const transporter = nodemailer.createTransport(nodemailerServer);

  const message = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Verify your email address",
    html: `
      <p>Hi there,</p>
      <p>Thanks for signing up for our app! Please click the link below to verify your email address:</p>
      <p><a href="${url}">${url}</a></p>
      <p>Best regards,</p>
      <p>The App Team</p>
    `,
  };

  await transporter.sendMail(message);
}
