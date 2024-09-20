import { Link } from "react-router-dom"
import { FaArrowRightLong } from "react-icons/fa6";
import BannerVideo from "../assets/Images/banner.mp4";
import { ExploreCourse, HiglightBtn, Higlighter, KnowMoreSection, Preview, TimelineHomeSection } from "../utils/index"


const Home = () => {
    return (
        <div className="w-full min-h-screen  ">

            {/* section 1 */}

            <div className="w-full bg-richblue-900 min-h-screen">

                <div className="p-1 gap-5">
                    <div className="w-8/12 mx-auto  pt-1 flex  flex-col justify-center gap-10  p-1 mt-10 text-white">

                        {/* instructor sign up button */}
                        <Link to={"/signUp"} >

                            <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 
                                        p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
                                        transition-all duration-200 hover:scale-95 hover:drop-shadow-none">

                                <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] 
                                        transition-all duration-200 group-hover:bg-richblack-900">
                                    <p>Become an Instructor</p>
                                    <FaArrowRightLong className=" mt-1" />

                                </div>


                            </div>
                        </Link>




                        <div className="flex flex-col justify-center items-center gap-2 ">
                            <div className=" text-4xl font-semibold">
                                Empower Your Future with
                                <Higlighter text={" Coding Skills"} />
                            </div>
                            <p className="text-richblack-200 font-medium"> With our online coding courses, you can learn at your own pace, from anywhere in the world,
                                and get access to a wealth of resources, including hands-on projects, quizzes, and
                                personalized feedback from instructors.
                            </p>

                            <div className="flex flex-row gap-8 justify-center mt-8">
                                <HiglightBtn text={"Learn more"} link={"/signUp"} active={true} />
                                <HiglightBtn text={"Book a demo"} link={"/signUp"} active={false} />
                            </div>

                        </div>


                        {/* video */}

                        <div className="py-10 relative ">



                            <video

                                className="drop-shadow-[7.5px_7.5px_rgba(255,255,255)] relative z-20 "
                                src={BannerVideo}
                                muted
                                autoPlay
                                loop={Infinity} />

                            <div className=" bg-gradient-to-b from-richblue-300   to-richblue-900
                                        w-72 h-48 rounded-full blur-2xl 
                                        absolute top-0 left-0 right-0  mx-auto z-10">

                            </div>
                        </div>


                        {/* preview sectio */}





                    </div>

                    <div className="w-9/12 mx-auto flex flex-col gap-40 justify-center text-white">


                        <Preview
                            heading=
                            {
                                <div className=" font-semibold text-4xl tracking-tight">
                                    Unlock your
                                    <Higlighter text={"  coding potential "} />
                                    with our online courses.
                                </div>
                            }
                            paragraph={
                                <p className="font-medium text-richblack-300">
                                    Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                                </p>
                            }
                            btn1={
                                {
                                    active: true,
                                    text:
                                        <div className="flex flex-row gap-2" >
                                            Try it Yourself <FaArrowRightLong className=" mt-[6px]" />
                                        </div>,
                                    link: "/signUp"
                                }
                            }
                            btn2={{ active: false, text: "Learn more", link: "/signUp" }}

                            align={"flex-row"}
                            codeblock={"<!DOCTYPE html>\n<html lang='en'>\n<head>\n<meta charset='UTF-8' />\n<title>Noopro || edtech</title>\n</head>\n<body>\n <div id='root'></div>\n</body>\n</html>"}
                            codeColor={"text-yellow-300"}
                            backgroundImg={
                                <div className=" bg-gradient-to-tr from-pink-600 via-yellow-800 to-richblue-800 
                                        w-full h-full absolute z-10 left-0 top-0 blur-3xl rounded-full
                                        ">

                                </div>
                            }
                            typeSpeed={200}
                            deleteSpeed={200}
                        />

                        <Preview
                            heading=
                            {
                                <div className=" font-semibold text-4xl tracking-tight">
                                    Start
                                    <Higlighter text={" codding "} /> <br />
                                    <Higlighter text={"in seconds"} />

                                </div>
                            }
                            paragraph={
                                <p className="font-medium text-richblack-300">
                                    Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                                </p>
                            }
                            btn1={
                                {
                                    active: true,
                                    text:
                                        <div className="flex flex-row gap-2" >
                                            Continue Lesson <FaArrowRightLong className=" mt-[6px]" />
                                        </div>,
                                    link: "/login"
                                }
                            }
                            btn2={{ active: false, text: "Learn more", link: "/signUp" }}

                            align={"flex-row-reverse"}
                            codeblock={"<!DOCTYPE html>\n<html lang='en'>\n<head>\n<meta charset='UTF-8' />\n<title>Noopro || edtech</title>\n</head>\n<body>\n <div id='root'></div>\n</body>\n</html>"}
                            codeColor={"text-pink-300"}
                            backgroundImg={
                                <div className=" bg-gradient-to-tr from-blue-400 via-richblue-500 to-blue-800 
                                        w-full h-full absolute z-10 left-0 top-0 blur-3xl rounded-full
                                        ">

                                </div>
                            }
                            typeSpeed={350}
                            deleteSpeed={200}
                        />

                    </div>

                    <ExploreCourse />

                </div>

            </div>



            {/* section 2 */}

            <div className="w-full bg-richblue-5 items-center mx-auto pb-5">

                <div className=" bg-hero-pattern  h-[320px] -mt-20 ">
                        
                    <div className="flex flex-row gap-10 pt-44 pb-10 w-11/12 justify-center ml-10">
                        <HiglightBtn
                            text={
                                <div className="flex flex-row gap-2 items-center">
                                    Explore Full Catlog  <FaArrowRightLong />

                                </div>
                            }
                            active={true}
                            link={"/signUp"}
                        />
                        <HiglightBtn link={"/signUp"} text={"Learn more"} active={false} />
                    </div>




                </div>

                <div className="w-11/12 mx-auto">
                    <TimelineHomeSection />
                    <KnowMoreSection />
                    
                </div>
            </div>

            {/* section 3 */}

            

            {/* section 4 */}

        </div>
    )
}

export default Home
