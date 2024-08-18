import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false,
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
  //   try {
  //     const info = await transporter.sendMail(mailOptions);
  //     console.log("Email sent:", info.response);
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //   }
};

export default sendEmail;
