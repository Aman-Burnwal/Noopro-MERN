import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { About, ContactUs, Login, MyProfile, Navigation, ResetPassword, SignUp } from "./utils"




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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/dashboard/user-profile" element= {<MyProfile />} />
      </Routes>
      
      
    </div>
  )
}

export default App
