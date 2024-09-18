import { Link } from "react-router-dom"
import { FaArrowRightLong } from "react-icons/fa6";
import Higlighter from "../components/core/HomePage/Higlighter";
import HiglightBtn from "../components/core/HomePage/HiglightBtn";

const Home = () => {
  return (
    <div className="w-full min-h-screen  ">

        {/* section 1 */}

        <div className="w-full bg-richblue-900 min-h-screen">

            <div className="p-1">
                <div className="w-8/12 mx-auto  pt-1 flex  flex-col justify-center gap-10  p-1 mt-10 text-white">

                    {/* instructor sign up button */}
                    <Link Link to={"/signUp"} >
                        
                        <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 
                                        p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
                                        transition-all duration-200 hover:scale-95 hover:drop-shadow-none">

                            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] 
                                        transition-all duration-200 group-hover:bg-richblack-900">
                                <p>Become an Instructor</p>
                                <FaArrowRightLong  className=" mt-1"/>

                            </div>


                        </div>
                    </Link>


                    {/* <h1>Empower Your Future with Coding Skills</h1> */}

                    <div className="flex flex-col justify-center items-center gap-2 ">
                        <div className="flex flex-row gap-2 text-4xl font-semibold">
                                Empower Your Future with 
                                <Higlighter text={"Coding Skills"} />
                         </div>
                        <p className="text-richblack-200 font-medium"> With our online coding courses, you can learn at your own pace, from anywhere in the world, 
                                and get access to a wealth of resources, including hands-on projects, quizzes, and
                                 personalized feedback from instructors.
                        </p>

                        <div className="flex flex-row gap-8 justify-center mt-8">
                            <HiglightBtn text={"Learn more"} link={"/signUp"} active={true} />
                            <HiglightBtn text={"Learn more"} link={"/signUp"} active={false} />
                        </div>
                        
                    </div>


                </div>




                


            </div>

        </div>



        {/* section 2 */}

        {/* section 3 */}

        {/* section 4 */}
      
    </div>
  )
}

export default Home
