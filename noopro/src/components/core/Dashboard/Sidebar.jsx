import { useDispatch, useSelector } from "react-redux"
import { sidebarLinks } from "../../../data/dashboard-links"
import SideBarLink from "./SideBarLink"
import Icon from "./Icon"
import { LogoutUserFunction } from "../Auth/LoginSignUpFormValidation"
import { useNavigate } from "react-router-dom"



const Sidebar = () => {
  const user = useSelector((store) => store.profile.user)
  const dispatch = useDispatch();
  const naviagate = useNavigate();

  return (
    <div className=" w-full flex flex-col gap-2  pt-10 text-white bg-richblue-900 min-h-screen">
      {
        sidebarLinks.map((data) =>  {
          if(data.type && data.type != user.accountType ) return null;

          return <SideBarLink key={data.id} data={data}/>
        })
      }
      <div className=" border-t border-s-blue-50 mt-5 pt-5 flex flex-col gap-2 shadow-xl">
      <SideBarLink  data={{name: "setting", path: "/setting", icon : "VscSettingsGear"}}/>
     
      <button className=" px-5 flex flex-row gap-5 items-center"
       onClick={() => (LogoutUserFunction("/" , dispatch, naviagate))}>
        <Icon iconName={"VscArrowRight"} />
        Logout
      </button>
      
      </div>
    </div>
  )
}

export default Sidebar
