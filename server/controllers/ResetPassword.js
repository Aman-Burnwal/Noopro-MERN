const User = require("../model/User");
const bcrypt = require("bcrypt")

const mailSender = require("../utils/mailSender")

// reset password token


exports.resetPasswordToken = async (req, res) => {

    try {
        // get email from req ki body
        const email = req.body;
    
        // check user for this email

        const user = User.findOne({email: email});

        if(!user) return res.status(401).json({
            success: false,
            message: "Your email is not registerd"
        })

        // generate token 
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            {   email: email,
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            {new: true}
        )
        const url = `http://localhost:3000/update-passwrord/${token}`


        // send mail containing the url
        await mailSender(email, "Password reset Link", "Password reset Link" + url)

        

        // return response
        return res.json({
            success: true,
            message: "Email sent successfully and password change successfully"
        })
    } catch (error) {
        console.error("error in reset password", error);
        return res.status(500).json({
            success: false,
            message: "Somewent went wrong in Password change"
        })
    }



    

}

// reset password  

exports.resetPassword = async(req, res) => {

    try {

        // data fetch
        const {password, confirmPassword, token} = req.body;
        //validation

        if(password !== confirmPassword) return res.json({
            success: false,
            message: "Password to match hi nhi kar rha h"
        })

        // get userDetails from db
        const userDetails = await User.findOne({token: token});


        // if no entry - invalid token
        if(!userDetails) return res.json({
            success: false,
            message: "Token is not valid"
        })


        // token time check
        if(userDetails.resetPasswordExpires < Date.now()) return res.json({
            success: false,
            message: "5 minute se jayda ho gaya dost ab phir se reset karna padega tere ko"
        })


        // hash password
        const hashPassword = await bcrypt.hash(password, 10);


        // update password
        await User.findOneAndUpdate({token: token}, {password: hashPassword}, {new: true})
        // return response
        return res.status(200).json({
            success: true,
            message: "Passowrd to reset ho gaya successfully ab isko yaad rakhna bahi "
        })

        
    } catch (error) {

        console.error("error in reseting password")

        return res.staus(500).json({
            success: false,
            message: "Error aa gaya password reset karne me"
        })
    }
}