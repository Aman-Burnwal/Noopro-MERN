import { useState } from "react"
import { ResetPasswordTokenAPI } from "../services/apis";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }



    try {
      // send email to reset password
      fetch(ResetPasswordTokenAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Email format ssl")

          if (data.success) {
            console.log(data);
            setErrorMessage(null);
            setMailSent(true);
            // navigate to success page
            // history.push("/reset-password-success");
          } else {
            setErrorMessage(data.message);
          }
          // console.log("Email format")
        })
      // setErrorMessage(null);
      // navigate to success page
      // history.push("/reset-password-success");
    } catch (error) {
      console.log("Email format ssl")

      setErrorMessage("Failed to send reset password email. Please try again later.", error);
    }

  }

  return (
    <div className="bg-richblue-800">
      <div className="w-11/12 mx-auto min-h-screen">
        <div className="   w-3/6 mx-auto   py-9">
          <div className="  flex flex-col  place-content-between  gap-3">
            <h1 className="text-richblack-5 text-3xl">{mailSent ? "Check email" : "Reset your password"}</h1>
            <p className="text-richblack-100 font-semibold text-xl">
              {
                !mailSent ?
                  "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                  : "We have sent the reset email to " + email
                    
                  
              }
                    
            </p>

            {/* form */}
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6 py-5">


              {
                !mailSent &&

                <div className="flex flex-col gap-4">


                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-richblack-25">Email</label>
                    <input
                      name="email"
                      className="rounded-lg bg-richblack-900 text-richblack-25 w-fit pl-2 py-3 placeholder:text-richblue-25"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>



                </div>
              }

              {
                errorMessage && (
                  <div className="text-pink-50 ">{errorMessage}</div>
                )
              }

              <button
                type="submit"
                className={`group px-6 py-3 w-fit rounded-lg font-medium text-center
                    hover:scale-95 transition-all duration-200 drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]
                       bg-yellow-50 text-richblack-900`}>
                <div className="leading-6 transition-all duration-200 group-hover:scale-95">
                  {mailSent ? "Resend Email" :"Reset Password"}
                </div>
              </button>
            </form>
            <Link to={"/login"} >
              <p className="text-blue-100 text-sm font-semibold flex  justify-normal  items-center gap-3">  {<BiArrowBack ></BiArrowBack>} Back to login</p>
            </Link>
            
            <p className="text-blue-100 text-sm font-semibold flex  justify-normal  items-center gap-3">Don&apos;t have an Account ? <span>
              <Link to={"/signup"} className="text-blue-100 underline font-semibold">Sign Up</Link>
            </span> </p>
        

          </div>


        </div>
      </div>
    </div>
  )
}
export default ResetPassword