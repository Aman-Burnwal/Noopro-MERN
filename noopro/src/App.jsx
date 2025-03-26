import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { About, ContactUs, Dashboard, Error, Login, MyProfile, Navigation, ProtectedRoute, ResetPassword, SignUp } from "./utils"




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
        <Route element={<ProtectedRoute />}> 
          <Route  element={<Dashboard />}>
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
          </Route>
        </Route>
        


        {/* <Route path="*" element={<Error/> } /> */}
        
        
      </Routes>
      
      
    </div>
  )
}

export default App
