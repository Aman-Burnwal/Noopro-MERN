
import { useDispatch, useSelector } from "react-redux";
import {  setUser } from "../../../../store/slice/profileSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserDetails } from "../../../services/apis";
import { LogoutUserFunction } from "./LoginSignUpFormValidation";


const ProfileDropDown = () => {
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.profile.user);



  const distpatch = useDispatch();

  useEffect(() => {

    if (!token) navigate("/")
    if (token && !user) {
      console.log("user ko fetch karo pahle")

      fetch(GetUserDetails, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${token}`
        },
      
      })
        .then(response => {
          if(response.status === 401) {
            LogoutUserFunction("/login",distpatch, navigate)
          }
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        } )
        .then(data => {
          distpatch(setUser(data.userDetails))
          console.log("user ko fetch kiya", data.userDetails);
        })
        .catch(error => console.error("Fetch error :", error));

    }

  }, [token])



  if(!user) return <div>Loding</div> 

  return (
    <div className=" relative"  >

      <img
         
       src={user?.iamge} 
       alt="profile" 
       className="w-10 h-10 rounded-full" 

       />
      
    </div>
  )
}

export default ProfileDropDown
