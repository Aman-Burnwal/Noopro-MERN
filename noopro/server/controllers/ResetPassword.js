const User = require("../model/User");
const bcrypt = require("bcrypt")

const mailSender = require("../utils/mailSender")

// reset password token


exports.resetPasswordToken = async (req, res) => {

    try {
        // get email from req ki body
        const {email} = req.body;
    
        // check user for this email

        const user = await User.findOne({ email});

        if(!user) return res.status(401).json({
            success: false,
            message: "Your email is not registerd"
        })

        // generate token 
        // console.log(user)
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            {email},
            {   
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            {new: true}
        )
        const url = `http://localhost:3000/update-passwrord/${token}`


        // send mail containing the url
        await mailSender(email, "Password reset Link", "Password reset Link:  " + url)

        

        // return response
        return res.json({
            success: true,
            message: "Email sent successfully and password change successfully",
            updatedDetails
        })
    } catch (error) {
        // console.error("error in reset password", error);
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
        const {password, confirmPassword, email, token} = req.body;
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


        // update password and set the token null so that it can be use only once 
        await User.findOneAndUpdate({token: token}, {password: hashPassword, token: null}, {new: true})
        // return response
        return res.status(200).json({
            success: true,
            message: "Password to successfully change ho gaya ab vidya kasam khaw ki password hamesa yaad rakhega"
        })

        
    } catch (error) {

        console.error("error in reseting password")

        return res.status(500).json({
            success: false,
            message: "Error aa gaya password reset karne me"
        })
    }
}