export const categories = {
    CATEGORIES_API: import.meta.env.VITE_BASE_URL + "/course/showAllCategories"
}

export const SendOtpAPI = import.meta.env.VITE_BASE_URL + "/auth/sendotp";
export const SignUpAPI = import.meta.env.VITE_BASE_URL + "/auth/signup";
export const LoginAPI = import.meta.env.VITE_BASE_URL + "/auth/login";
export const GetUserDetails = import.meta.env.VITE_BASE_URL + "/profile/getUserDetails"
export const ResetPasswordTokenAPI = import.meta.env.VITE_BASE_URL + "/auth/reset-password-token";