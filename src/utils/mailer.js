import User from "@/models/users";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/config/db";
connectDB();

export async function sendEmail({ email, emailType, userId, username }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const verifyToken = await uuidv4();
    const update = {
      [emailType === "VERIFY" ? "verifyTokenExp" : "resetTokenExp"]:
        Date.now() + 3600000,
      [emailType === "VERIFY" ? "verifyToken" : "resetToken"]: verifyToken,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, update);

    await transporter.sendMail({
      from: "lakshaybabbar0118@outlook.com",
      to: email,
      subject: emailType === "VERIFY" ? "Email Verification" : "Reset Password",
      html: `<h1>CodeFramer</h1>
      ${username && `<h3>Hello ${username}</h3>`}
      <p>${
        emailType === "VERIFY"
          ? "Verify your registeration by clicking the link given below"
          : "Reset your password bu clicking the link given below"
      }</p>
      <a href="${
        `${process.env.BASE_URL}/auth/verification?token=` + verifyToken
      }">Click here</a>`,
    });
  } catch (error) {
    console.log(error);
  }
}
