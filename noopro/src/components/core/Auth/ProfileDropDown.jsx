
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../../../store/slice/authSlice";
import { removeUser, setUser } from "../../../../store/slice/profileSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserDetails } from "../../../services/apis";


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
        .then(response => response.json() )
        .then(data => {
          distpatch(setUser(data.userDetails))
          // console.log("Success:", data)
          console.log(data.userDetails.iamge);
        })
        .catch(error => console.error("Fetch error :", error));

    }

  }, [token])

 

  const LogoutHandle = () => {
    distpatch(removeToken());
    distpatch(removeUser());

  }

  return (
    <div className=" relative">
      {/* <FaUser className="relative" /> */}
      <img src={user?.iamge} alt="profile" className="w-10 h-10 rounded-full" />
      <div className="">
        <p className=" w-fit px-3 py-2 text-pure-greys-5">{user.firstName}</p>
        <button onClick={() => LogoutHandle()} >  Logout</button>
      </div>
    </div>
  )
}

export default ProfileDropDown
