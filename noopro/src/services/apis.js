export const categories = {
    CATEGORIES_API: import.meta.env.VITE_BASE_URL + "/course/showAllCategories"
}

export const SendOtpAPI = import.meta.env.VITE_BASE_URL + "/auth/sendotp";
export const SignUpAPI = import.meta.env.VITE_BASE_URL + "/auth/signup";
export const LoginAPI = import.meta.env.VITE_BASE_URL + "/auth/login";
export const GetUserDetails = import.meta.env.VITE_BASE_URL + "/profile/getUserDetails"
export const ResetPasswordTokenAPI = import.meta.env.VITE_BASE_URL + "/auth/reset-password-token";
export const ProfilePictureAPI =import.meta.env.VITE_BASE_URL + "/profile/updateDisplayPicture"
export const ChangePasswordAPI = import.meta.env.VITE_BASE_URL + "/auth/changepassword";
export const UPDATE_PROFILE_API = import.meta.env.VITE_BASE_URL + "/profile/updateProfile"
export const DELETE_PROFILE_API = import.meta.env.VITE_BASE_URL + "/profile/deleteProfile"
export const GET_ENROLL_COURSE_API = import.meta.env.VITE_BASE_URL + "/profile/getEnrolledCourses"
export const CREATE_COURSE_API = import.meta.env.VITE_BASE_URL + "/course/createCourse"
export const EDIT_COURSE_API = import.meta.env.VITE_BASE_URL + "/course/editCourse"
export const CREATE_SECTION_API = import.meta.env.VITE_BASE_URL + "/course/addSection";

