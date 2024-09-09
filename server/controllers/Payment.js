import mongoose from "mongoose";

const {instance} = require("../config/razorPay");
const Course = require("../model/Course");
const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");



// capture the payment and initiate the Razorpay order

exports.capturePayment = async (req, res) => {

    // get course id and userId
    const userId = req.user.id;
    const {courseId} = req.body;
    // validation 
    if(!courseId) return res.status(403).json({
        success: false, 
        message: "Please provide valid course Id"
    })

    let course;
    try {
        course = await Course.findById(courseId);
        if(!course)return res.status(403).json({
            success: false, 
            message: "could not find the course"
        })
        // user already pay for the same Course

        let uid = new mongoose.Types.ObjectId(userId);

        if(course.studentEnrolled.includes(uid)){
            return res.status(200).josn({
                success:false,
                message: "student is already enrolled"
            })
        }
        
    
    } catch (error) {

        console.error("error in capturing payment");

        return res.staus(500).json({
            success: false,
            message: error.message
        })
        
    }

   
    // order create 

    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: courseId,
            userId,
        }
    }

    try {
        // initaite the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        // return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDiscription: course.courseDiscription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount:paymentResponse.amount,
        })

        console.log(paymentResponse);
    } catch (error) {
        console.error("error in payment response");
        return res.status(403).json({
            success: false,
            message: "Could not initate order"
        })
    }
    
}

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.headers("x-razorpay-signature");

    const shasum = crypto.createHmac("sha256", webhookSecret);

    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest("hex");


    if(signature == digest) {
        console.log("Payment is Authorized");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try {
            
            // full fill the action

            // find the course and enroll the student in it

            const enrollCourse = await Course.findByIdAndUpdate(
                                                                    {_id: courseId},
                                                                    {$push: {studentEnrolled: userId}},
                                                                    {new: true}
            )

            if(!enrollCourse) return res.status(500).json({
                success: false,
                message: "Course not found"
            })

            console.log(enrollCourse);

            // find the student and add the course to their list enrolled courses 

            const enrolledStudent = await User.findByIdAndUpdate(
                                                    {_id:userId},
                                                    {$push: {courses: courseId}},
                                                    {new: true},
            )

            console.log(enrolledStudent);


            // send mail of confirmation

            const emailResponse = await mailSender(
                                            enrolledStudent.email,

                                            "Congratullation from Noopro || Aman",
                                            "Congratullation you are onboarded into new codehelp course",

                )

            console.log(emailResponse)

            return res.status(200).json({
                    success: true,
                    message: "Signature verified and course added"
            })




        } catch (error) {

            console.error("signature did not matched")
            return res.status(500).json({
                success: false,
                message: error.message
            })
            
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid  signatue"
        })
    }


}