const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile =  require("../model/Profile");
const mailSender = require("../utils/mailSender");

const OTP = require("../model/Otp");
const User = require("../model/User")
const otpGenrator = require("otp-generator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config()

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
        
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body;


        // validate data

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) return res.status(403).json({
            success: false,
            message: "Sab input fields sahi se to bharo nahi to aage nhi jane dunga mai 👿"
        })


        // match the password

        if(password != confirmPassword) return res.status(400).json({
            success: false,
            message: "dono password match nahi kar rha h ji"
        });


        // check kar lo kahi user register to nhi h

        const existingUser = await User.find({email});

        if(existingUser) return res.status(400).json({
            success: false,
            message: "Tu to pahle se register h phir kahe ko phir se register kar rha h "
        })


        // find most recent otp stored for the user

        const recentOTP = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log("recentOTP", recentOTP);

        // validateOTP

        if(recentOTP.length == 0) return res.status(400).json({
            success: false,
            message: "OTP to mila hi nhi :("
        })

        if(otp != recentOTP.otp) res.status(400).json({
            success: false,
            message: "OTP to match hi nhi huwa ji"
        })

        // hash password 

        const hashPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({gender:null, dateOfBirth: null, about: null, contactNumber: null});

        // create entry in Db
        const user = new User({
            firstName, lastName, email, contactNumber, accountType, password:hashPassword,
            additonDetail: profileDetails._id,
            
            iamge:`https://ui-avatars.com/api/?name=${firstName}+${lastName}`
        })

        return res.status(200).json({
            success:true,
            message: "Bhai mubarak ho tum to register ho gaye :)"
        })


    } catch (error) {
        console.error("error in registration", error);
        res.status(500).json({
            success: false,
            message: "Kuchh to gadbad hai daya jo user register nhi ho paya "
        })
    }
}


// Login

module.Login = async(req, res) => {
    try {
        const {email, password} = req.body;

        // validate the data 

        if(!email || !password) return res.status(403).json({
            success: false,
            message: "email aur password dono field bharna h ji"
        })

        // check kahi user register hi to nhi hai

        const user = await User.findOne({email}).populate("additonDetail");

        if(!user) return res.status(401).json({
            success: false,
            message: "Register ho ke login kar nhi to utha utha ke patkunga chori karne ke iljam me"
        })


        // generate jWT token, after matching the token

        if(await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })

            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                exprires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).staus(200).json({
                success: true,
                token, 
                user, 
                message: "Arrey shabash login ho gaya tu to........🙌"
            })
        }else {
            res.staus(401).json({
                success: false,
                message: "Password agar sahi deta na to abhi tu login kar jata"
            })
        }

        

    } catch (error) {
        console.error("error in Login", error);

        res.status(500).json({
            success: false, 
            message: "Ab tu login bhi nhi kar pa rha h yarr\n hadd hoti hai bachkane ki 😒"
        })
    }
}

// changePassword

module.ChangePassword = async(req, res) => {

    try {
        
        // get data from body
        const userId = req.user.id;
        const userDetails = await User.findById(userId)
        // get oldPassword, newPassword, confirmPassword
        const {oldPassword, newPassword} = req.body;

        // validation
        if(!oldPassword || !newPassword) return res.status(401).json({
            success: false,
            message: "All fields are required"
        })

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

        if(!isPasswordMatch) return res.staus(401).json({
            success: false,
            message: "old Password did not match"
        })

        // update pwd in DB

        const updatedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate({_id: userId}, {password:updatedPassword}, {new: true})
        // send mail - password updated


        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email, 
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            )

            console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
              success: false,
              message: "Error occurred while sending email",
              error: error.message,
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })


        
    } catch (error) {
         console.error("Error occurred while updating password:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        })
    }
}