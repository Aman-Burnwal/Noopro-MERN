import toast from "react-hot-toast"
import { GET_ALL_INSTRUCTOR_COURSES_API } from "../../services/apis"
import { removeUser } from "../../../store/slice/profileSlice"
import { removeToken } from "../../../store/slice/authSlice"

export const fetchInstructorCourses = async (token, dispatch) => {
  let result = []

  
  const toastId = toast.loading("Loading...")
  try {
    await fetch(GET_ALL_INSTRUCTOR_COURSES_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(res => {
     
      if (res?.status === 401) {
        dispatch(removeUser())
        dispatch(removeToken())
        toast.error("Logout Suceessfully")
      }
      return res.json()


    }).then((res) => {

      if(res.success) {
        result = res.courses
        // toast.success("Found successfully");
      }
    })
    .catch((error) => {
      toast.error("Error in Getting Instructor Courses");
      console.log(error)
    })

   
  } catch (error) {
    // console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  // console.log(result)
  return result
  // return null
}


export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

