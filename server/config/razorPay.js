 const RazorPay = require("razorpay");

exports.instance = new RazorPay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})