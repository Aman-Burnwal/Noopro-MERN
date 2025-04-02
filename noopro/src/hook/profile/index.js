import { removeToken } from "../../../store/slice/authSlice"
import { removeUser } from "../../../store/slice/profileSlice"
import { ProfilePictureAPI } from "../../utils"



export const updateProfilePictue = async (token, data , navigate, dispatch, path) => {
    
    const formData = new FormData();
    formData.append("displayPicture", data);

    // console.log("Form data", formData)

    await fetch( ProfilePictureAPI, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer${token}`
        },
        // body: formData,  error in uploading image
        body: formData,
    })

    .then((res) => {

        console.log("Befor json converter", res)
        if (res?.status === 401) {
            console.log("Unauthorized, logging out...")
            dispatch(removeUser())
            dispatch(removeToken())
            navigate(path)
            
        } 
       return res.json()

    })
    .then((res) => {
        console.log("Response from server", res)
        if (res?.status === 200) {
            console.log("Profile picture updated successfully")
            return;
        } else if (res?.status === 401) {
            console.log("Unauthorized, logging out...")
            dispatch(removeUser())
            dispatch(removeToken())
            navigate(path)
        } else {
            console.log("Error updating profile picture", res)
        }
    })
    .catch((error) => console.log("Error in updating profile picture", error))
}