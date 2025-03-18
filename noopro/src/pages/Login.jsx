import { useEffect, useState } from "react"
import sundarKanya from "../assets/Images/signup.webp"
import {  LoginAPI } from "../services/apis"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { add } from "../../store/slice/authSlice"

const Login = () => {

  const navigate = useNavigate()

  const token = useSelector((state) => state.auth.token);
  const distpatch = useDispatch();

  useEffect(() => {
    if(token) navigate("/")
  }, [token])


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    accountType: "Student",
    isError: false,
    errorMessage: "",
   
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {


    e.preventDefault()

    // check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormData({ ...formData, isError: true, errorMessage: "Invalid email format" })
      return
    }
    // check if password has at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(formData.password)) {
      setFormData({ ...formData, isError: true, errorMessage: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character" })
      return
    }


    await fetch(LoginAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {

        if (!data.success) {
          setFormData({ ...formData, isError: true, errorMessage: data.message });
          return;
        }
      
        distpatch(add(data.token));
        localStorage.setItem("token", data.token);
        setFormData({ ...formData, isError: "", errorMessage: "" });
      })
      .catch((error) => {
        console.error("Error:", error)
        setFormData({ ...formData, isError: true, errorMessage: "Failed to Login. Please try again later" })

      })


  }

  return (
    <div className="bg-richblue-800">
      <div className="w-11/12 mx-auto min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between items-center py-9">
          <div className="col-span-1 flex flex-col gap-3">
            <h1 className="text-richblack-5 text-3xl">Welcome Back</h1>
            <p className="text-richblack-100 font-semibold text-xl">Build skills for today, tomorrow, and beyond.</p>
            <p className="text-blue-100 font-semibold font-edu-sa italic">Education to future-proof your career.</p>

            {/* form */}
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6 py-5">
              <div className="rounded-full bg-richblack-600 flex flex-row gap-4 px-4 py-2 w-fit transition-all delay-150 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
                <div
                  className={`${formData.accountType === "Student" ? "text-richblack-50 bg-richblack-800" : "bg-transparent text-richblack-100 font-semibold"} cursor-pointer text-xl rounded-full px-4 py-2`}
                  onClick={() => setFormData({ ...formData, accountType: "Student" })}
                >
                  Student
                </div>
                <div
                  className={`${formData.accountType === "Instructor" ? "text-richblack-50 bg-richblack-800" : "text-richblack-100 font-semibold"}  cursor-pointer text-xl rounded-full px-4 py-2`}
                  onClick={() => setFormData({ ...formData, accountType: "Instructor" })}
                >
                  Instructor
                </div>
              </div>

              <div className="flex flex-col gap-4">
              

                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-richblack-25">Email</label>
                  <input
                    name="email"
                    className="rounded-lg bg-richblack-900 text-richblack-25 w-fit pl-2 py-3 placeholder:text-richblue-25"
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-3 text-richblack-25">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                      name="password"
                      className="rounded-lg bg-richblack-900 pl-2 py-3 placeholder:text-richblue-25"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      type="password"
                    />
                    <Link to={"/reset-password"} >
                      <p className="text-blue-100 text-sm font-semibold">Forget Password</p>
                    </Link>
                  </div>
                  
                 
                </div>
              </div>
             

              {
                formData.isError && (
                  <div className="text-pink-50 ">{formData.errorMessage}</div>
                )
              }

              <button className={`group px-6 py-3 w-fit rounded-lg font-medium text-center
                hover:scale-95 transition-all duration-200 drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]
                   bg-yellow-50 text-richblack-900`}>
                <div className="leading-6 transition-all duration-200 group-hover:scale-95">
                  Sign In
                </div>
              </button>
            </form>
            
          </div>
          {/* image */}
          <div className="hidden md:block">
            <img src={sundarKanya} alt="Sign Up" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login