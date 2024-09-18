const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const mailSender = require("../utils/mailSender");

const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender")

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    otp: {
        type: String,
       require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
})

async function sendVerificationEmail(email, otp) {

    try {
        const mailResponse = await mailSender(email, "Verification email from Noopro", otpTemplate(otp));

        // console.log("mail sent successfully", mailResponse);
    } catch (error) {
        console.log("error in sending email", error);
        throw error;
    }
}


otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("Otp", otpSchema)