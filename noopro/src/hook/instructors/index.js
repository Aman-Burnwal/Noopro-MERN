import toast from "react-hot-toast"
import { DELETE_COURSE_API, GET_ALL_INSTRUCTOR_COURSES_API, GET_FULL_COURSE_DETAILS_AUTHENTICATED } from "../../services/apis"
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


export const getFullDetailsOfCourse = async (courseId, token , dispatch) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    await fetch(GET_FULL_COURSE_DETAILS_AUTHENTICATED, 
      {
        method: "POST",
             headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({courseId}),
    }).then(res => {
      
      if (res?.status === 401) {
        dispatch(removeUser())
        dispatch(removeToken())
        toast.error("Logout Suceessfully")
      }
      return res.json()


    }).then((res) => {
      console.log(res.data);

      if(res.success) {
        result = res.data
        toast.success("Found successfully");
      }
    })
    .catch((error) => {
      toast.error("Error in Getting Instructor Courses");
      console.log(error)
    })
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

export const deleteCourse = async (data, token, dispatch) => {
  const toastId = toast.loading("Loading...")
  try {
    fetch(DELETE_COURSE_API, {
      method: "DELETE",
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


    }).then((res) => {

      if(res.success) {
       
        toast.success("Deleted successfully");
      }
    })
    .catch((error) => {
      toast.error("Error in Deleting Course");
      console.log(error)
    })
  
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}



