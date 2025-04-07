import { useDispatch, useSelector } from "react-redux"
import PasswordComponent from "../common/PasswordComponent";

import { updateProfilePictue } from "../../../utils";
import { useNavigate } from "react-router-dom";



const EditProfile = () => {



  const user = useSelector((store) => store.profile.user);

  // console.log(user);

  return (
    <div className=" w-full">
    <div className="  w-9/12 mx-auto pt-14 ">
     

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
    </div>
  )
}

export default EditProfile
