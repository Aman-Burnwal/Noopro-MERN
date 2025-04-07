
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Icon from "./Icon"
import IconBtn from "../common/IconBtn"
import { RiEditBoxLine } from "react-icons/ri"


const MyProfile = () => {

  const navigate = useNavigate()

  const user = useSelector((state) => state.profile.user)



  return (
    <div className=" w-full">


      <div className=" w-9/12 mx-auto pt-14">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          My Profile
        </h1>
        <div className="flex items-center justify-between rounded-md border-[1px]  border-richblack-300 bg-richblack-700 p-8 px-12">
          <div className="flex items-center gap-x-4">
            <img
              src={user?.iamge}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-richblack-5">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-sm text-richblack-300">{user?.email}</p>
            </div>
          </div>
         <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn> 
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-300 bg-richblack-700 p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">About</p>
            <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          </div>
          <p
            className={`${user?.additonDetail?.about
              ? "text-richblack-5"
              : "text-richblack-400"
              } text-sm font-medium`}
          >
            {user?.additonDetail?.about ?? "Write Something About Yourself"}
          </p>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px]  border-richblack-300 bg-richblack-700 p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              Personal Details
            </p>
            <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
            </IconBtn>
          </div>
          <div className="flex max-w-[500px] justify-between">
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-richblack-600">First Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.firstName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600">Email</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.email}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600">Gender</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additonDetail?.gender ?? "Add Gender"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.lastName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additonDetail?.contactNumber ?? "Add Contact Number"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                <p className="text-sm font-medium text-richblack-5">
                  {(user?.additonDetail?.dateOfBirth) ??
                    "Add Date Of Birth"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default MyProfile
