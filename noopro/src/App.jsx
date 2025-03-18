import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Login, Navigation, ResetPassword, SignUp } from "./utils"




const App = () => {
  return (
    <div className="">
        <Navigation />

      <Routes >
        <Route path="/" element={<Home/>}/>
        <Route path="/login"  element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      
      
    </div>
  )
}

export default App
