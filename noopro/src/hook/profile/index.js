import toast from "react-hot-toast"
import { removeToken } from "../../../store/slice/authSlice"
import { removeUser, setUser } from "../../../store/slice/profileSlice"
import { ProfilePictureAPI } from "../../utils"
import { CREATE_SECTION_API, CREATE_SUBSECTION_API, DELETE_PROFILE_API, DELETE_SECTION_API, UPDATE_PROFILE_API, UPDATE_SECTION_API, UPDATE_SUBSECTION_API } from "../../services/apis"


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


// export function deleteProfilePicture(token) {

//   const formData = new FormData();

//   formData.append("displayPicture", null);

// }


export const updateProfilePictue = async (token, data, dispatch, user) => {

  const formData = new FormData();
  formData.append("displayPicture", data);

  // console.log("Form data", formData)

  await fetch(ProfilePictureAPI, {
    method: "PUT",
    headers: {
      // "Content-Type": "application/json",
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
      if (res.success) {
        dispatch(setUser({ ...user, iamge: res.data.iamge }));
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
        if (res.success) {
          dispatch(removeUser())
          dispatch(removeToken())
          toast.success("Account deleted successfully")
        }

      })
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


export const createSubSection = async (data, token, dispatch) => {
   let result = null
  const toastId = toast.loading("Loading...")
  try {

    await fetch(CREATE_SUBSECTION_API, {
      method: "POST",
      headers: {
       
        Authorization: token
      },
      body: data
    }).then(res => {
      if (res?.status === 401) {
        dispatch(removeUser())
        dispatch(removeToken())
        toast.error("Logout Suceessfully")
      }
       return res.json()
    })
    .then((res) => {
        console.log(res);
        if (res?.success) {
          result = res.updatedSection

          toast.success("subsection created successfully")
        }

      })
      .catch((error) => {
        console.log("Error in creating subsection", error);
        toast.error("Error in creating subsection ");
      })
      .finally(console.log("Crete_sub_section_api API completed............"))

  } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data, token , dispatch) => {
   let result = null
  const toastId = toast.loading("Loading...")
  try {

    await fetch(UPDATE_SUBSECTION_API, {
      method: "POST",
      headers: {
       
        Authorization: token
      },
      body: data
    }).then(res => {
      if (res?.status === 401) {
        dispatch(removeUser())
        dispatch(removeToken())
        toast.error("Logout Suceessfully")
      }
       return res.json()
    })
    .then((res) => {
        console.log(res);
        if (res?.success) {
          result = res.updatedSection

          toast.success("subsection created successfully")
        }

      })
      .catch((error) => {
        console.log("Error in creating subsection", error);
        toast.error("Error in creating subsection ");
      })
      .finally(console.log("Crete_sub_section_api API completed............"))

  } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a section
export const createSection = async (data, token, dispatch) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {

    await fetch(CREATE_SECTION_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res?.status === 401) {
        dispatch(removeUser())
        dispatch(removeToken())
        toast.error("Logout Suceessfully")
      }
       return res.json()
    })
    .then((res) => {
        console.log(res);
        if (res?.success) {
          result = res
          toast.success("section created successfully")
        }

      })
      .catch((error) => {
        console.log("Error in creating section", error);
        toast.error("Error in creating section ");
      })
      .finally(console.log("Crete_section_api API completed............"))

  } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a section
export const updateSection = async (data, token, dispatch) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    
      await fetch(UPDATE_SECTION_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res?.status === 401) {
        dispatch(removeUser())
        dispatch(removeToken())
        toast.error("Logout Suceessfully")
      }
       return res.json()
    })
    .then((res) => {
        console.log(res);
        if (res?.success) {
          result = res
          toast.success("section created successfully")
        }

      })
      .catch((error) => {
        console.log("Error in creating section", error);
        toast.error("Error in creating section ");
      })
      .finally(console.log("Crete_section_api API completed............"))
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// delete a section
export const deleteSection = async (data, token, dispatch) => {
  let result = null
  console.log("deleteSectionCalled")
  const toastId = toast.loading("Loading...")
  try {
    await fetch (DELETE_SECTION_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(data)
    }).then(res => {
      console.log(res)
      if (res?.status === 401) {
        dispatch(removeUser())
        dispatch(removeToken())
        toast.error("Logout Suceessfully")
      }
       return res.json()
    })
    .then((res) => {
        console.log(res);
        if (res?.success) {
          result = res.updatedCourse
          toast.success("section delted successfully")
        }

      })
      .catch((error) => {
        console.log("Error in deliting section", error);
        toast.error("Error in deliting section ");
      })
      .finally(console.log("delete_section_api API completed............"));
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}