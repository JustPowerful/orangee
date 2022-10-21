const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

console.log(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASS)

module.exports = transporter