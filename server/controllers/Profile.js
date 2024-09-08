const Profile = require("../model/Profile");
const User = require("../model/User");


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
            message: "Profile updated successfully"
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

        const userDetails = await User.findById(id).populate("additonDetail").exec();

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