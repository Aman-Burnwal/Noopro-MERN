import { useState } from "react"
import PasswordComponent from "../../common/PasswordComponent"
import { passwodChanger } from "../../../../hook/auth/login";
import { useDispatch, useSelector } from "react-redux";


const UpdatePassword = () => {

        const dispatch = useDispatch();
        const token = useSelector((store) => store.auth.token);
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [eroor, setError] = useState({
                error: false,
                message: null,
        })
        return (
                <div className=" px-6 py-4 text-richblack-50 border-[0.2px] border-richblack-100 bg-richblack-600 rounded-md" >
                        <h1 className=" text-3xl font-edu-sa">Password</h1>
                        
                        <form  onSubmit={(e) =>  passwodChanger(e, password, confirmPassword, 
                        setError , dispatch  , token, eroor, setPassword, setConfirmPassword)}
                                className=" relative  py-4 ">

                                <div className="flex flex-row  justify-between">
                                <PasswordComponent 
                                        password={password}
                                        
                                        setPssword={setPassword}
                                        text={"Current Password"} id={"current-password"} 
                                        placeHolder={"Your current Password"} 

                                />
                                <PasswordComponent 
                                        password={confirmPassword}
                                        setPssword={setConfirmPassword}
                                        text={"Change Password"} 
                                        id={"new-password"} 
                                        placeHolder={"Your New Password"} 

                                />
                                </div>
                                {eroor.error && <p>{eroor.message}</p>}
                                <button className=" border-2 border-blue-5 mt-3 px-6 py-1 rounded-md bg-richblack-100
                                 text-richblue-500 font-inter "   type="Submit">Submit</button>
                        
                              

                        </form>
                </div>
        )
}

export default UpdatePassword
