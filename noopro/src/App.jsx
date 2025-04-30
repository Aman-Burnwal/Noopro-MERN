import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { About, AddCourse, Cart, ContactUs, Dashboard, EditCourse, EnrolledCourses, Error, Login, MyCourses, MyProfile, Navigation, ProtectedRoute, ResetPassword, Settings, SignUp } from "./utils"
import { useSelector } from "react-redux"
import { ACCOUNT_TYPE } from "./utils/constants"





const App = () => {

  const user = useSelector((store) => store.profile.user);

  return (
    <div className="">
      <Navigation />

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="dashboard/cart" element={<Cart />} />
                  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                </>
              )
            }

            {
              user?.accountType == ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="/dashboard/my-courses" element={<MyCourses />} />
                  <Route path="/dashboard/add-course" element={<AddCourse />} />
                  <Route path="/dashboard/edit-course/:courseId" element ={<EditCourse/>} />
                </>
              )
            }


          </Route>
        </Route>



        <Route path="*" element={<Error />} />


      </Routes>


    </div>
  )
}

export default App
