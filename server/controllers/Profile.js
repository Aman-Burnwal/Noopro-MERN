const Profile = require("../model/Profile");
const User = require("../model/User");
const {uploadImageToCloudinay} = require ("../utils/imageUploader");


exports.updateProfile = async (req, res) => {

    try {
        // get data
        const {dateOfBirth = "", about ="", contactNumber, gender} = req.body;
        // get userId
        const id = req.user.id;
        // validation

        if(!contactNumber || !gender) return res.status(400).json({
            success: false,
            message: "Please fill required fields"
        })
        // find Profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additonDetail;
        const profileDetails = await Profile.findById(profileId);
        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();
        
        // return response

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails,
        })
    } catch (error) {
        console.error("error in updating profile", error);

        return res.status(500).json({
            success: false,
            message: "error in updating profile",
            error: error.message
        })
    }
}




exports.deleteProfile = async (req, res) => {

    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        if(!userDetails) return res.status(404).json({
            success: false,
            message: "Wrong user id"
        })

        await Profile.findByIdAndDelete({_id:userDetails.additonDetail});
        await User.findByIdAndDelete({_id: userId});

        return res.status(200).json({
            success: true,
            message: "User Account delted Successfully",
        })
    } catch (error) {
        console.error("error in deleting profile", error);

        return res.status(500).json({
            success: false,
            message: "error in deleting profile",
            error: error.message
        })
    }
}


exports.getAllUserDetails = async (req, res) => {
    try {

        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additonDetail").populate("courses").exec();

        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            userDetails
        })
        
    } catch (error) {
        console.error("error in fetching profile", error);

        return res.status(500).json({
            success: false,
            message: "error in fetching profile",
            error: error.message
        })
    }
}



exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinay(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)

      const updatedProfile = await User.findByIdAndUpdate(
         userId ,
        {iamge: image.secure_url},
        { new: true }
      ).populate("additonDetail").exec();
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnroled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
}