const nodemailer = require("nodemailer");
require("dotenv");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//     },
//     tls: {
//         rejectUnauthorized: false,
//     },
// });

// exports.mail = transporter

const sendAsyncMail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Verify Account",
    html: `Use this token : ${token} for verification`,
  });
};

exports.mail = sendAsyncMail;
