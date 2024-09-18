const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async(req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Beared", "");

        if(!token) return res.status(401).json({
            success: false,
            message: "Login kar lo pahle kyuki token tere pass nhi h"
        })

        // verify token

        try {
            const decode =  jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token to sahi se daal"
            })
        }
        next()
    } catch (error) {
        console.error("error in authentication", error)
        return res.status(401).json({
            success: false,
            message: "pata nhi kaha error aa gaya authentication me"
        })
    }
}

// student

exports.isStudent = async (req, res, next) => {

    try {

        if(req.user.accountType != "Student") return res.staus.json({
            success: false, 
            message: "Yaha sirf student log aa sakta h kyuki ye protected hai tau ji"
        })
        next();
    } catch (error) {
        console.log("error in Student verification");
        return res.status(500).json({
            success: false,
            message: "User role can not be verified Please try again"
        })
    }
}

// instructor

exports.isInstructor = async (req, res, next) => {

    try {

        if(req.user.accountType != "Instructor") return res.staus.json({
            success: false, 
            message: "Yaha sirf Instructor log aa sakta h kyuki ye protected hai tau ji"
        })
        next();
    } catch (error) {
        console.log("error in Instructor verification");
        return res.status(500).json({
            success: false,
            message: "User role can not be verified Please try again"
        })
    }
}
// admin

exports.isAdmin = async (req, res, next) => {

    try {

        if(req.user.accountType != "Admin") return res.staus.json({
            success: false, 
            message: "Yaha sirf Admin log aa sakta h kyuki ye protected hai tau ji"
        })
        next();
    } catch (error) {
        console.log("error in Admin verification");
        return res.status(500).json({
            success: false,
            message: "User role can not be verified Please try again"
        })
    }
}