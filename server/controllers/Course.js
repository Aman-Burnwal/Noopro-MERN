const Category = require( "../model/Category");

const Course = require("../model/Course");
const Tag = require("../model/Tag");
const User = require("../model/User");
const { uploadImageToCloudinay } = require("../utils/imageUploader");


// create cource handler
exports.createCourse = async (req, res) => {

    try {

        // fetch data
        const { courseName, coureDiscription, whatYouWillLearn, price, tag, category } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if (!courseName || !coureDiscription || !whatYouWillLearn || !price || !tag || !category) return res.status(400).json({
            success: false,
            message: "All fields are required",
        })

        // check for instructor
        const userId = req.user.id;

        const instructorDetails = await User.findById(userId);
        console.log(instructorDetails);
        if (!instructorDetails) return res.status(400).json({
            success: false,
            message: "Instructor details not found",
        })

        // check given tag is valid or not 
        const tagDetails = await Category.findById({_id:category});

        if (!tagDetails) return res.status(400).json({
            success: false,
            message: "tagDetails not  found",
        })

        const thumbnailImage = await uploadImageToCloudinay(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course

        const nayaCourse = await Course.create({
            courseName,
            coureDiscription,
            insturctor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        // add the new course to the user schema of  instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: { courses: nayaCourse._id }
            },
            { new: true },
        )

        // update the tag ka schema 
        // todo HW
        // return response

        return res.status(200).json({
            success: true,
            message: "course created successfully"
        })


    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Course create karne me kuchh to gadbad aa gaya dada"
        })
    }
}


//get all course

exports.showAllCourses = async (req, res) => {

    try {

        const allCourses = await Course.find({});

        return res.staus(200).json({
            success: false,
            message: "Succes in fetching all courses",
            allCourses
        })

    } catch (error) {
        console.error("Error in getting all courses");
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Courses fetch karne me error aa gaya",
            error: error.message,
        })
    }
}

//get course Details

exports.getCourseDetails = async (req, res) => {

    try {
        // get id
        const { courseId } = req.body;

        // find course details

        const CourseDetails = await Course.find(
            { _id: courseId })
            .populate(
                {
                    path: "insturctor",
                    populate: {
                        path: "additonDetail"
                    },
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate(
                {
                    path: "courseContent",
                }
            ).exec();


            if(!CourseDetails) return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`
            })

            return res.status(200).json({
                success: true,
                message: ` find the course with ${courseId}`,
                data: CourseDetails,
            })


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}