import toast from "react-hot-toast"
import { categories, CREATE_COURSE_API, EDIT_COURSE_API } from "../../services/apis"
import { removeToken } from "../../../store/slice/authSlice"
import { removeUser } from "../../../store/slice/profileSlice"

export const addCourseDetails = async (data, token, dispatch) => {
        
        let result = null

        await fetch(CREATE_COURSE_API, {
                method: "POST",
                headers: {
                //      "Content-Type": "multipart/form-data",
                     Authorization: token,
                },
                body: data

        }).then(res => {

                console.log(res)
                if (res.status == 401) {
                        dispatch(removeToken());
                        dispatch(removeUser());
                        console.log("Heye it's error time")
                        return;
                }
                console.log("In Res 1 ", res)

                if (res.status == 200) {

                        toast.success("Course Details Added Successfully")
                }

                return res.json()
        })
                .then(res => {
                        if(res && res.success ) {
                          console.log(res)
                          result = res?.data;
                        }
                })
                .catch(error => console.log("The error is here ", error));
        console.log(result);
        return result;
}


export const editCourseDetails = async (data, token) => {
        let result = null
      
        const toastId = toast.loading("Loading...")
        try {
                const response = fetch("POST", EDIT_COURSE_API, data, {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                })
                console.log("EDIT COURSE API RESPONSE............", response)
                if (!response?.data?.success) {
                        throw new Error("Could Not Update Course Details")
                }
                toast.success("Course Details Updated Successfully")
                result = response?.data?.data
        } catch (error) {
                console.log("EDIT COURSE API ERROR............", error)
                toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
}

export const fetchCourseCategories = async () => {

        let result = [];
        await fetch(categories.CATEGORIES_API)
                .then(res => res.json())
                .then(e => e.data)
                .then(e => result = e )
                .catch(e => console.log("error in fetching ", e))
        
      
        return result;

}

