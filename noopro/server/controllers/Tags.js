const Tag = require("../model/Tag");

// create Tag ka handler function


exports.createTag = async (req, res) => {
    try {

        const {name, description} = req.body;

        if(!name || !description) return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
        
        const tagDetails = await Tag.create({
            name: name, 
            discription: discription,
        })

        console.log(tagDetails);

        return res.status.json(200).json({
            success: true,
            message: "Tag created successfully"
        })

    } catch (error) {
        console.error("error in crete tag");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// get all tags
exports.showAlltags = async (req, res) => {
    try {

        const allTags = await Tag.find({}, {name:true, discription: true});

        res.status(200).json({
            success:true,
            message: "all tags shown succssfully",
            allTags,
        })
        
    } catch (error) {
        console.error("error in showing tag");
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}