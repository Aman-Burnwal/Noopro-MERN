import {  matchPath , NavLink, useLocation, useMatch} from "react-router-dom"
import Icon from "./Icon"


const SideBarLink = ({data}) => {


  const location = useLocation();
  const pathname = location.pathname;
  
  

  const match = () => {

    return matchPath( {
      path: data.path,
      exact: true,
      strict: true,
    }, pathname);
  
  }


  return (
    <NavLink to={data.path}>
      <div 
        className={` px-5 py-2 flex flex-row gap-5 items-center  ${match() ? " text-yellow-5 bg-yellow-600 border-l-2 border-l-yellow-5" : " "}  `}>
        <Icon iconName={data?.icon} />
        <p>{data.name}</p>
      </div>
    </NavLink>
  )
}

export default SideBarLink
