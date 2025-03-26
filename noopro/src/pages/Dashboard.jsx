
import { Outlet } from 'react-router-dom'
import {  Sidebar } from '../utils'



const Dashboard = () => {



  
  return (

    <div className=" min-h-screen bg-richblack-800 w-full">
      <div className=' flex flex-col gap-6 w-fit'>
          <div className=' '>
            <Sidebar/>
          </div>
          <div className=' '>
            <Outlet />
          </div>
      </div>
      
    </div>

  )
}

export default Dashboard
