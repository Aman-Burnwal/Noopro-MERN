const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transpoter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'yolanda17@ethereal.email',
                pass: 'TNFqbp81EkhKw8fb7K'
            }
        })

        let info = await transpoter.sendMail({
            from: "Noopro || edu website",
            to: email,
            subject: title,
            html: body
        })

        console.log(info);

        return info;
    } catch (error) {
        console.log(error)
    }
}

module.exports = mailSender;