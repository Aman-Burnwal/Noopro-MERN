import toast from "react-hot-toast"
import { removeToken } from "../../../store/slice/authSlice"
import { removeUser, setUser } from "../../../store/slice/profileSlice"
import { ProfilePictureAPI } from "../../utils"
import { DELETE_PROFILE_API, UPDATE_PROFILE_API } from "../../services/apis"


export function updateProfile(token, formData) {

  return async (dispatch) => {


    fetch(UPDATE_PROFILE_API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${token}`
      },
      body: JSON.stringify(formData),

    })
      .then((res) => {
        if (res?.status === 401) {
          dispatch(removeUser())
          dispatch(removeToken())
          toast.error("Logout Suceessfully")
        }


        return res.json()
      })
      .then(response => {

        console.log("in last time ", response)

        toast.success(" Profile Updated SucessFully")


        dispatch(
          setUser({ ...response?.updatedUserDetails })
        )
      })
      .catch((error) => {
        console.log("Error in updating profile", error);
        toast.error("Error in updating profile");
      })
      .finally(console.log("UPDATE_PROFILE_API API completed............"))



  }
}




export const updateProfilePictue = async (token, data, dispatch) => {

  const formData = new FormData();
  formData.append("displayPicture", data);

  // console.log("Form data", formData)

  await fetch(ProfilePictureAPI, {
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

      }
      return res.json()

    })
    .then((res) => {
      console.log("Response from server", res)
      if (res?.status === 200) {
        console.log("Profile picture updated successfully")
        toast.success("Profile Picture Updated Successfully")
        return;
      } else if (res?.status === 401) {
        console.log("Unauthorized, logging out...")
        dispatch(removeUser())
        dispatch(removeToken())

      } else {
        toast.error("Error in updating profile Picture")
        console.log("Error updating profile picture", res)
      }
    })
    .catch((error) => console.log("Error in updating profile picture", error))
}


export function deleteProfile(token) {
  return async (dispatch) => {
    
    fetch(DELETE_PROFILE_API, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${token}`
      },
      body: JSON.stringify()
   

    })
      .then((res) => {
        if (res?.status === 401) {
          dispatch(removeUser())
          dispatch(removeToken())
          toast.error("Logout Suceessfully")
        }


        return res.json()
      })
      .then((res) => {
        console.log(res);
        if(res.success) {
          dispatch(removeUser())
          dispatch(removeToken())
          toast.success("Account deleted successfully")
        }
        
      } )
      .catch((error) => {
        console.log("Error in deleting account", error);
        toast.error("Error in deleting account");
      })
      .finally(console.log("UPDATE_PROFILE_API API completed............"))
   
  }
}

export const getUserEnrolledCourses = async (token) => {

  // console.log(token)

  return [];

}