import { useDispatch, useSelector } from "react-redux";
import { updateProfilePictue } from "../../../../utils";


const ChangeProfilePicture = () => {


        const user = useSelector((store) => store.profile.user);

        const token = useSelector((store) => store.auth.token);
     
        const dispatch = useDispatch();
        return (
                <div>
                        <div className=" mb-5 px-6 py-8  flex flex-row  gap-10 items-center border-richblack-100 border-[0.5px]  rounded-md bg-richblack-600  ">
                                <img className=" relative rounded-full shadow h-16  object-cover  w-16 " src={user.iamge} alt="profile-pic" />

                                <div className=" flex flex-col gap-4">

                                        <h1 className=" text-richblack-25">Change your profile Photo</h1>

                                        <div

                                                className=" flex flex-row gap-5 ">

                                                <label
                                                        htmlFor="file_input"
                                                        className="group px-4 py-2   rounded-md cursor-pointer  font-medium text-center 
                            bg-yellow-50 text-richblack-900"
                                                >
                                                        Upload
                                                </label>
                                                <input

                                                        onChange={(e) => updateProfilePictue(token, (e.target.files[0]), dispatch, user)  }

                                                        className="   hidden " id="file_input" type="file"

                                                />

                                                <button
                                                        onClick={() => console.log("You want to remove your profile pic")}

                                                        className="group px-4 py-2  rounded-md  font-medium text-center  bg-richblack-50 text-richblack-900"
                                                > Remove

                                                </button>

                                        </div>



                                </div>
                        </div>
                </div>
        )
}

export default ChangeProfilePicture
