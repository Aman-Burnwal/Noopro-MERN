const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transpoter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })

        let info = await transpoter.sendMail({
            from: process.env.EMAIL_PASS, // Include email address in from
            to: email,
            subject: title,
            html: body
        });
        // console.groupCollapsed(email, body, title)
        // console.log(info);

        return info;
    } catch (error) {
        console.log(error)
    }
}

module.exports = mailSender;