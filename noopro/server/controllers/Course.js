const Category = require( "../model/Category");

const Course = require("../model/Course");
const Tag = require("../model/Tag");
const User = require("../model/User");
const { uploadImageToCloudinay } = require("../utils/imageUploader");


// create cource handler
exports.createCourse = async (req, res) => {

    try {

        // fetch data
        const { courseName, coureDiscription, whatYouWillLearn, price, tag, category , instructions } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if (!courseName || !coureDiscription || !whatYouWillLearn || !price || !tag || !category || !instructions) return res.status(400).json({
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
        const categorys = await Category.findById({_id:category});

        if (!categorys) return res.status(400).json({
            success: false,
            message: "catogory not  found",
        })

        const thumbnailImage = await uploadImageToCloudinay(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course

        const nayaCourse = await Course.create({
            courseName,
            coureDiscription,
            insturctor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categorys._id,
            tag: JSON.parse(tag),
            thumbnail: thumbnailImage.secure_url,
            instructions : JSON.parse(instructions),
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
        const categoryDetails2 = await Category.findByIdAndUpdate(
            { _id: category },
            {
              $push: {
                courses: nayaCourse._id,
              },
            },
            { new: true }
          )
          console.log("HEREEEEEEEE", categoryDetails2)
        // todo HW
        // return response

        return res.status(200).json({
            success: true,
            message: "course created successfully",
            data: nayaCourse
        })


    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Course create karne me kuchh to gadbad aa gaya dada"
        })
    }
}


exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage =  await uploadImageToCloudinay(thumbnail, process.env.FOLDER_NAME)
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "insturctor",
          populate: {
            path: "additonDetail",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "SubSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
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
                    populate: {
                        path: "SubSection"
                    }
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


exports.getInstructorCourses = async (req, res) => {

    try {
        const userId = req.user.id;

        const instructorDetails = await User.findById(userId);
        // console.log(instructorDetails);
        if (!instructorDetails ) return res.status(400).json({
            success: false,
            message: "Instructor details not found",
        })

        if(instructorDetails.accountType != "Instructor") return res.status(401).json({
          success: false,
          message : "commonsense wali baat hai dear jab aap guruji ho hi nhi mere platform me to aap koi course launch kaise kar sakte ho aur jab couse hi nhi launch kiya to dikhau kya ghanta",
          sollution : "Insturctor id se login kijiye ya account banayea"
        })
        // console.log("got the course")

        // console.log(instructorDetails)


        const course = await User.findById(userId).populate("courses").exec();

        // console.log(course);

        return res.status(200).json({
          success: true,
          message: "Found all data", 
          courses: course.courses
        })
    } catch (error) {
        
        return res.status(500).json({
          success: false, 
          message: "Internal Server error in getting insturctor couser",
          error: error
        })
    }
}