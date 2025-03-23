import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const MyProfile = () => {

  const navigate = useNavigate()

  const user = useSelector((state) => state.profile.user)
  const token = useSelector(state => state.auth.token)

 
  


  useEffect(() => {
    if(!token) navigate("/")
  },[token])

  return (
    <div>
      
    </div>
  )
}

export default MyProfile
