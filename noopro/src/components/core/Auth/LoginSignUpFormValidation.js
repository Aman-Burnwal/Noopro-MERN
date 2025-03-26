
import { removeUser } from "../../../../store/slice/profileSlice";
import { removeToken } from "../../../../store/slice/authSlice";



export const LogoutUserFunction = async (path, dispatch , navigate) => {

  dispatch((removeUser()));
  dispatch((removeToken()));
  navigate(path)
  
        
}

export const FetchUserDetails = async (token, dispatch) => {
        
}