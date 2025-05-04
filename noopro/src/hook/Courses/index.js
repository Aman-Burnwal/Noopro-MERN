import toast from "react-hot-toast"
import { CATEGORIES_COURSE_API, GET_COURSE_DETAILS_API, SHOW_ALL_CATAGORIES_COURSE_API } from "../../services/apis";
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

export const fetchCourseDetails = async ( courseId) => {
        // const toastId = toast.loading("Loading...")
        console.log(courseId)
        //   dispatch(setLoading(true));
        let result = null
        try {
                await fetch(GET_COURSE_DETAILS_API, {
                        method: "POST",
                        headers : {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({courseId}),
                   
                })
                .then(res => {

                        // console.log(res);
                        if(res.status == 400) {
                                console.log("CourseId is wrong")
                                return;
                        }

                        // console.log(res)
                        
                        return res.json()
                })
                .then(res => {
                        console.log(res)
                        result = res.data[0]
                })
                .catch(error => {
                        console.log("error ocuured")
                        console.log(error)
                })
        } catch (error) {
                result = error
                console.log(error);
        }

        // toast.dismiss(toastId);
        return result;
}



function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`,
                                })

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}