import { FaArrowRight, FaArrowRightArrowLeft } from "react-icons/fa6";
import instructorProfile from "../../../assets/Images/Instructor.png";
import { HiglightBtn, Higlighter } from "../../../utils/index"

const BecomeInstructorSection = () => {
  return (
    <div className="py-10 select-none flex flex-row  gap-16 text-richblack-5 font-inter items-center justify-center">

      <div className=" ">
        <img
          className=" select-none shadow-[-15px_-15.1px_rgba(225,225,255,1)] object-cover transition-all duration-200 cursor-pointer hover:scale-95  "
          src={instructorProfile}
          width={"616px"}
          height={"545px"}
          loading={"lazy"}

        />
      </div>

      <div className=" flex flex-col gap-8  w-[498px]">
        <div className=" font-semibold text-4xl ">
          Become an
          <div><Higlighter text={"instructor"} /></div>
        </div>

        <p className=" font-semibold text-richblack-300">
          Instructors from around the world teach millions
          of students on StudyNotion. We provide the tools and skills to teach what you love.
        </p>

        <HiglightBtn text={
          <div className="flex flex-row gap-2 items-center justify-center">
            Start Teaching Today  <FaArrowRight />
          </div>
        } active={true} link={"/signUp"} />
      </div>

    </div>
  )
}

export default BecomeInstructorSection
