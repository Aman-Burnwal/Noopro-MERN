import { useDispatch, useSelector } from "react-redux"
import PasswordComponent from "../common/PasswordComponent";

import { updateProfilePictue } from "../../../utils";
import { useNavigate } from "react-router-dom";



const EditProfile = () => {



  const user = useSelector((store) => store.profile.user);

  const token = useSelector((store) => store.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(user);

  return (
    <div className="   w-full  z-20   ">
      <div className=" mb-5 px-6 py-8  flex flex-row  gap-5 items-center  rounded-md bg-richblack-600  ">
        <img className=" relative rounded-full shadow h-16  object-cover  w-16 " src={user.iamge} alt="profile-pic" />

        <div className=" flex flex-col gap-6">

          <h1>Change your profile Photo</h1>

          <div

            className=" flex flex-row gap-5">

            <label
              htmlFor="file_input"
              className="group px-5 py-2   rounded-md cursor-pointer  font-medium text-center 
                      bg-yellow-50 text-richblack-900"
            >
              Upload
            </label>
            <input

              onChange={(e) => updateProfilePictue(token, (e.target.files[0]), navigate, dispatch, "/")}

              className=" w-full text-sm  hidden text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"

            />

            <button
              onClick={() => console.log("You want to remove your profile pic")}

              className="group px-5 py-2  rounded-md  font-medium text-center 
                      bg-richblack-50 text-richblack-900"
            > Remove

            </button>

          </div>



        </div>
      </div>

      <div className="  px-6 py-8  flex flex-col  gap-5   rounded-md bg-richblack-600  ">

        <h1>Profile Information</h1>

        <form className=" flex flex-col gap-6">



          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder={`${user.firstName}`}

              />
            </div>
            <div className=" flex flex-col">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder={`${user.lastName}`}

              />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className=" flex flex-col">
              <label htmlFor="dateOfBirt">First Name</label>
              <input
                type="date"
                id="dateOfBirt"


              />
            </div>
            <div className=" flex flex-row gap-4">
              <div className=" flex flex-row text-black gap-1">

                <input type="radio" id="html1" name="fav_language" value="HTML" />
                <label htmlFor="css">CSS</label>


              </div>
              <div className=" flex flex-row text-black gap-1">
                <label htmlFor="css">CSS</label>
                <input type="radio" id="html2" name="fav_language" value="HTML" />


              </div>
              <div className=" flex flex-row text-black gap-1">
                <label htmlFor="css">CSS</label>
                <input type="radio" id="html" name="fav_language" value="HTML" />

              </div>

            </div>



          </div>

          <div className="" >
            <h1>Password</h1>
            <PasswordComponent text={"Current Password"} />
            <div className=" relative flex flex-row  justify-between">


              <PasswordComponent text={"Change Password"} />
              <PasswordComponent text={"Change Password"} />

            </div>
          </div>




        </form>


      </div>

    </div>
  )
}

export default EditProfile
