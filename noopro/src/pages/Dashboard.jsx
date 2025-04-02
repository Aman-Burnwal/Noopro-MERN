
import { Outlet } from 'react-router-dom'
import {  Sidebar } from '../utils'



const Dashboard = () => {



  
  return (

    <div className=" min-h-screen bg-richblack-800 w-full">
      <div className=' grid  grid-cols-5 gap-6 w-full justify-between'>
          <div className= "  col-span-1">
            <Sidebar/>
          </div>
          <div className=' col-span-4  '>
            <Outlet />
          </div>
      </div>
      
    </div>

  )
}

export default Dashboard
