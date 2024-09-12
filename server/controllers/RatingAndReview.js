const mongoose = require( "mongoose");
const Category = require ("../model/Category");

const RatingAndReview = require("../model/RatingAndReview");
const Course = require("../model/Course");

// create rating and review

exports.createRating = async (req, res) => {

    try {
        // get user id
        const userId = req.user.id;

        // fetch data from request body

        const {rating, reveiw, courseId} = req.body;

        // check kar lo ki user enrolled h ki nhi

        const courseDetails = await Course.findOne(
            {
                _id:courseId,
                studentEnrolled : {$eleMatch: {$eq: userId}},
            },

        )
        if(!courseDetails) return res.status(404).json({
            success: false,
            message: "Student is not enrolled in this course"
        })
        // user sirf ak hi baar review kar sakta h

        const alreadyReviewed = await RatingAndReview.findOne(
            {
                user:userId,
                course:courseId
            }
        )

        if(alreadyReviewed) return res.status(403).json({
            success: false,
            message: "Already reviewed by the user"
        })


        // create kar do rating user ke request par

        const ratingReview = await RatingAndReview.create(
            {rating, reveiw, user: userId, course: courseId }
        )

        // update kar do rating ko course ke sath

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId, 
            {
                $push: {
                    ratingAndReviews: ratingReview._id
                }
            },
            {new: true}
        )
        console.log(updatedCourse);
 
         // return response

         return res.status(200).json({
            success: true,
            messaga: "Rating and Review successfully",
            ratingReview
         })


    } catch (error) {
        return res.status(500).json({
            success: false,
            messaga: error.message,
       
         })
    }
}




// get avg rating and review 

exports.getAvgRating = async (req, res) => {

    try {
        // get course id
        const courseId = req.body.courseId;


        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: { course: new mongoose.Types.ObjectId(courseId) }
            },
            {
                $group:{
                    _id: null,
                    avgRating: {$avg: "rating"}
                }
            }
        ])


        // return rating

        if(result.length > 0) return res.status(200).json({
            success: true,
            averageRating: result[0],
        })
        else return res.status(200).json({
            success: true,
            message: "no rating found because no one rated yet",
            averageRating: 0
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            messaga: error.message,
       
         })
    }
}



// get all rating and review

exports.getAllRating = async (req, res) => {

    try {
        
        const allReviews = await RatingAndReview.find({})
            .sort({rating:"desc"})
            .populate({
                path:"user",
                select: "firstName, lastName, email, image"
            })
            .populate({
                path: "course",
                select:"courseName"
            }).exec();


        return res.staus(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data : allReviews,
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            messaga: error.message,
       
         })
    }
}



// category page details

exports.categoryPageDetails = async (req, res) => {
    
    try {
        
        // get category id
        const {categoryId} = req.body
        // get category course
        const selectedCategory = await Category.findById(categoryId)
                                .populate("courses")
                                .exec();

        if(!selectedCategory) return res.status(404).json({
            success: false,
            message: "Data not found"
        })
        // get additonal courses

        const differentCategories = await Category.find(
                    {
                        _id:{$ne:categoryId}
                    }
                )
                .populate("courses")
                .exec()

        
        // get top selling course -> HW

        // return response

        return res.staus(200).json({
            success: true,
            data: {
                selectedCategory, differentCategories
            }
        })




    } catch (error) {
        console.error(error)
        return res.status(500).json(
            {
            success: false,
            messaga: error.message,
       
         })
    }
}
