const OTP = require("../model/Otp");
const User = require("../model/User")
const otpGenrator = require("otp-generator");

// send OTP

exports.sendOTP = async (req, res) => {

    try {
        const {email} = req.body;

        // check if user already exist

        const checkUserPresent = await User.find({email});
        // check kar lo kahi ye user hame bewkoof banane ki kosis to nhi kar rha h dubara registration karne ke liye
        if(checkUserPresent) return res.status(401).json({
            success: false,
            message: "Arre ji aap to already register ho phir dubara register kyu kar rhe ho\n Yadi dubara try kiya register karne ke liye to dabase se delate ho ke purnjanam lena padega re baba"
            
        })


        // genrate OTP

        var otp = otpGenrator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        console.log("Genrated Otp is ", otp)
        // check for unique otp
        let result = await OTP.findOne({otp: otp});

        while(result) {
            otp = otpGenrator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
        }

        const otpPayload = {email, otp}

        // create an entry in db for OTP

        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: false,
            message: "OTP to bina dikkat ke chala gaya dadu"
        })


    } catch (error) {

        console.log("error aa gaya re dadu OTP sending me");

        res.status(500).json({
            success: false,
            message: "error aa gaya otp send karne me"
        })
        
    }
}

// signUp

exports.signUP = async (req, res) => {

    try {
        
        


    } catch (error) {
        
    }
}


// Login

// changePassword