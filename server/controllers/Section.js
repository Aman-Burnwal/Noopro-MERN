const Section = require("../model/Section");
const Course = require("../model/Course");

exports.createSection = async (req, res) => {

    try {
        // data fetch
        const { sectionName, courseId } = req.body;
        // data validation
        if (!sectionName || !courseId) return res.status(400).json({
            success: false,
            message: "Missing Properties"
        })
        // create section
        const newSection = await Section.create({ sectionName })
        // update the course with section object id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId, {
            $push: {
                courseContent: newSection._id,
            },

        },
            { new: true }

        ) // use populate to replace section and sub section both in the updatedCourseDetails
        // return response
        return res.staus(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        })




    } catch (error) {

        console.error("error in Section creation ", error);
        return res.staus(500).json({
            success: false,
            message: "Error in Section creation",
            error: error.message
        })

    }
}

exports.updateSection = async (req, res) => {

    try {

        // fetch data
        const { sectionName, sectionId } = req.body;
        // validate data
        if (!sectionId || !sectionName) return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
        // update data 
        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
            {
                sectionName
            },
            {new: true}
        )
        // return res

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedSection,
        })

    } catch (error) {
        console.log("error in updating section");
        res.status(500).json({
            success: false,
            message: "Error in updating the section",
            errror: error.message
        })
    }
}


exports.deleteSection = async (req, res) => {

    try {
        // fetch the id 
        const {sectionId} = req.params;

        // find by id and delete
        await Section.findByIdAndDelete(sectionId);

        
        // return response

        return res.status(200).json({
            success: true,
            message: "Section deleted from the data base"
        })




    } catch (error) {
        console.log("error in deleting section");
        res.status(500).json({
            success: false,
            message: "Error in deleting the section",
            errror: error.message
        })
    }
}