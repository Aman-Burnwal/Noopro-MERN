const { uploadImageToCloudinay } = require("../utils/imageUploader");

const SubSection = require("../model/SubSection");
const Section = require("../model/Section");
require("dotenv").config();

// create Subsection 

exports.createSubSection = async (req, res) => {

    try {
        const {sectionId, title, timeDuration, discription} = req.body;

        const video = req.files.videoFile;

        if(!sectionId || !title || !timeDuration || !discription) return res.status(400).json({
            success: false,
            message: "All fileds are required"
        })

        const uploadDetails  = await uploadImageToCloudinay(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create(
            {
                title: title, timeDuration:  timeDuration,
                discription: discription, videoUrl : uploadDetails.secure_url,
            }
        )

        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId}, 
            {
                $push: {
                    SubSection: subSectionDetails,
                }
            },
            {new: true}

        )

        return res.status(200).json({
            success: true,
            message: "Succesfully created the subSection"
        })
    } catch (error) {

        console.error("error in creating the subsection", error);

        return res.status(500).json({
            success: false,
            message: "error in creating the subsection",
            error: error.message
        })
        
    }
}


// hw update SubSection

// hw delete SubSection