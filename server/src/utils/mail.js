const nodemailer = require('nodemailer');
require('dotenv')

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

const sendAsyncMail = async (email, url) => {

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
        subject: 'Verify Account',
        html: `Click <a href = '${url}'>here</a> to confirm your email.`
    })
}

exports.mail = sendAsyncMail