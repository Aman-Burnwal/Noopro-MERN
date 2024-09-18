const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    }, 
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
      
    },
    accountType: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Instructor"]
    },
    additonDetail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    courses: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
        }

    ],
    token: {
        type: String
    },
    resetPasswordExpires: {
        tyep: Date
    },
    iamge: {
        type: String,
        required: true
    },
    courseProgess: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress"
        }
    ]

})

module.exports = mongoose.model("User", UserSchema);