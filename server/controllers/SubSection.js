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
exports.updateSubSection = async (req, res) => {
    

    try {

        const {subSectionId, title, timeDuration, discription} = req.body;

        if(!subSectionId) return res.status(401).json({
            success:false, 
            message: "boka h kya ji aap ye to descide kar lo ki kon se subsection ko update karna h"
        })
 
        const isValid = await SubSection.findById( subSectionId);
        if(!isValid) return res.status(403).json({
            success: false,
            message: "no subsection found"
        })


        const updatedSubsection = await SubSection.findByIdAndUpdate({_id: subSectionId}, {
            title: title, 
        

        }, {new: true})

        res.status(200).json({
            success: true,
            message: "updated successfull",
            updatedSubsection,
        })
        
    } catch (error) {

        console.log(error.message)


        res.status(500).json({
            success: false,
            message: "update unsuccessfull",
            error: error.message,
        })
        
    }

}

// hw delete SubSection

exports.deleteSubSection = async (req, res) => {
    

    try {

        const {subSectionId} = req.body;

        if(!subSectionId) return res.status(401).json({
            success:false, 
            message: "boka h kya ji aap ye to descide kar lo ki kon se subsection ko update karna h"
        })
 
        const isValid = await SubSection.findById( subSectionId);
        if(!isValid) return res.status(403).json({
            success: false,
            message: "no subsection found"
        })


        await SubSection.findByIdAndDelete({_id: subSectionId})

        res.status(200).json({
            success: true,
            message: "updated successfull",
            
        })
        
    } catch (error) {

        console.log(error.message)


        res.status(500).json({
            success: false,
            message: "update unsuccessfull",
            error: error.message,
        })
        
    }

}