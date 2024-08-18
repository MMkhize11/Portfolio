import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "redacted",
    pass: "redacted",
  },
});

const sendEmail = async (from: any, subject: any, message: any, name: any) => {
  const mailOptions = {
    to: "mmkhize11@gmail.com",
    from: from,
    subject: subject,
    html: `Message from  ${name}   ` + message,
    text: message,
  };

  return await transporter.sendMail({
    from: from,
    to: "mmkhize11@gmail.com",
    subject: "From Portfolio , Subject is : " + subject,
    html: `Message from  ${name}   Message : ` + message,
    text: `Message from  ${name}   Message :` + message,
  });
};

export default sendEmail;
