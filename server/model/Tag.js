const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
     
    },
    discription: {
        type: String,
        requried: true,
        trim: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
})

module.exports = mongoose.model("Tag", tagSchema);