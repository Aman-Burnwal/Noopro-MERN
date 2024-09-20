
import { HiglightBtn, Higlighter } from "../../../utils/index"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImg from "../../../assets/Images/TimelineImage.png"


const TimelineHomeSection = () => {

    const TimeLine = [
        {
            logo: Logo1,
            header: "Leardership",
            description: "Fully committed to the success company"
        },
        {
            logo: Logo2,
            header: "Responsiblity",
            description: "Students will always be our top priority"
        },
        {
            logo: Logo3,
            header: "Flxiblity",
            description: "The ability to switch is an important skills"
        },
        {
            logo: Logo4,
            header: "Solve the problem",
            description: "Code your way to a solution"
        },
    ]

    return (
        <div className="pt-20">

            <div className="flex flex-row gap-5  w-full  ">

                <div className="text-4xl  text-richblack-900 font-semibold  -tracking-[2%]">
                    Get the skills you need for a
                    <Higlighter text={" job that is in demand."} />
                </div>
                <div className="">
                    <div className=" flex flex-col gap-7 font-medium text-[#2C333F] leading-6 
                            font-inter pl-10 ">
                        <p >The modern StudyNotion is the dictates its own terms. Today, to be a
                            competitive specialist requires more than professional skills.
                        </p>
                        <HiglightBtn active={true} link={"/signUp"} text={"Learn more"} />
                    </div>
                </div>
            </div>


            <div className="pt-20 flex flex-row gap-10 items-center ">
                {/* left */}
                <div className="flex flex-col gap-14">
                    {TimeLine.map(
                        (ele, ind) => {
                            return <div key={ind}>
                                <div className="relative flex flex-row gap-5 font-inter font-semibold text-lg">
                                    <div className=" relative rounded-full bg-white  h-[54px] w-[54px]  
                                        border border-white flex justify-center items-center  ">
                                        <img src={ele.logo} />
                                    </div>

                                    <div className=" flex flex-col">
                                        <h1 className=" text-richblue-800">{ele.header}</h1>
                                        <p className=" text-richblue-500 text-sm">{ele.description}</p>
                                    </div>

                                    {ind < 3 && <div
                                        className=" left-7 top-16 absolute h-10 border border-l-richblue-100 border-dashed">

                                    </div>
                                    }

                                </div>
                            </div>
                        }
                    )}
                </div>

                {/* right */}
                <div className=" group relative mx-auto items-center">
                    <img
                        width="714px"
                        height="515px"
                        className="  translate-x-10 z-20 object-cover relative " src={TimelineImg} alt="Timeline-img" 
                        
                     />
                    <div className=" hidden group-hover:block transition-all  duration-500 absolute min-h-80 
                        rounded-full   top-0  z-10 translate-x-7
                        bg-gradient-to-tr px-20 from-blue-50  to-blue-100 blur-3xl"> 
                        
                    </div>

                    <div className="hidden group-hover:block transition-all  duration-500  absolute h-48  rounded-full  right-0 -translate-y-72 z-10
                        bg-gradient-to-tr px-20 from-blue-50  to-blue-200 blur-3xl"> 
                        
                    </div>
                    
                    
                    <div className="flex flex-row justify-between items-center  gap-8 px-6 py-8 z-30
                                    font-inter  bg-caribbeangreen-800 w-[511px] relative
                                    -translate-y-14 translate-x-32">
                        <div className="flex flex-row gap-8 border-r border-r-caribbeangreen-300">
                            <div className=" font-bold text-richblack-5 text-4xl">10</div>
                            <p className=" text-caribbeangreen-300  font-medium">YEARS EXPERIENCES</p>
                        </div>
                        <div className="flex flex-row  gap-8">
                        <div className=" font-bold text-richblack-5 text-4xl">256</div>
                        <p className=" text-caribbeangreen-300  font-medium">TYPES OF COURSES</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineHomeSection
