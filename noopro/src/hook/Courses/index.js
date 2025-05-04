import toast from "react-hot-toast"
import { CATEGORIES_COURSE_API, SHOW_ALL_CATAGORIES_COURSE_API } from "../../services/apis";
import { removeUser } from "../../../store/slice/profileSlice";
import { removeToken } from "../../../store/slice/authSlice";


export const getCatalogaPageData = async (dispatch, categoryId) => {
        const toastId = toast.loading("loading");
        let response = null;
        try {
                
                await fetch(CATEGORIES_COURSE_API, {
                        method : "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body : JSON.stringify({categoryId})
                })
                .then((res) => {

                        ;

                        if(res.status == 401) {

                                dispatch(removeUser());
                                dispatch(removeToken());
                        }
                        return res.json();
                })
                .then((res) => {
                        // console.log(res)
                        if(res.success) {
                                response = res;
                        }
                })
        } catch (error) {
               
                console.log(error)
        }

        toast.dismiss(toastId);
        return response;
}

export const getAllCategoriesCourse = async (dispatch) => {
        const toastId = toast.loading("loading");
        let response = null;
        try {
                
                await fetch(SHOW_ALL_CATAGORIES_COURSE_API, {
                        method : "GET",
                        
                })
                .then((res) => {
                        if(res.status == 401) {

                                dispatch(removeUser());
                                dispatch(removeToken());
                        }
                        return res.json();
                })
                .then((res) => {
                        // console.log(res)
                        if(res.success) {
                                response = res.data;
                        }
                })
        } catch (error) {
               
                console.log(error)
        }

        toast.dismiss(toastId);
        return response;
}