const nodemailer = require("nodemailer")

const dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

function sendEmail(options) {
    return new Promise((resolve, reject) => {
        const to = options.to
        const subject = options.subject
        const message = options.message
        console.log("message", typeof message);

        const messageHtml = options.html || message.replace("\n", "<br/>") // usally replaceAll() could be a reason cauze of older chrosme version maybe

        transporter.sendMail({
            from: '"Twitter Team" <supercoderpro@gmail.com>',
            to,
            subject,
            text: message,
            html: messageHtml,
        }).then((sentMessageInfo) => {
            const wasSentSuccesssFully = sentMessageInfo.accepted.includes(to)

            if (wasSentSuccesssFully) {
                resolve()
            } else {
                reject()
            }
        }).catch((err) => {
            console.log("Error sending email", err);
            reject()
        })
    })
}

module.exports = {
    sendEmail
}