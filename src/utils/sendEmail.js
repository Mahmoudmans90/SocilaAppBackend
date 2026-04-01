import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "c01889f7825632",
    pass: "82f4e8a749043f",
  },
});

export const SendEmail = async ({ email, vfcode, name }) => {
  try {
    await transporter.sendMail({
      from: "mahmoud@gmail.com",
      to: email,
      subject: "Email Vaerification To Blog App",
      html: `<h1>hello ${name} Your Verification code is ${vfcode}</h1>`,
    });
  } catch (error) {
    console.log(error);
  }
};
