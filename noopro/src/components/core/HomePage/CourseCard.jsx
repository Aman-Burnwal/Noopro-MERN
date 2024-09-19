import { MdPeople  } from "react-icons/md";
import { FcFlowChart } from "react-icons/fc";

const CourseCard = ({heading, description, level, lessons , active}) => {
    return (
        <div className={`h-[300px] w-[310px] mt-10 px-5  py-5  font-inter  transition-all duration-200
        ${active ? "shadow-[10px_10px_rgba(235,181,0,0.8)] text-richblack-800 bg-white": "text-white bg-richblue-800  border border-richblue-100"}
          rounded-sm flex flex-col justify-between cursor-pointer  hover:scale-95 `}>

            <div className="flex flex-col gap-3">
                <h1 className="font-semibold text-xl">{heading}</h1>
                <p className="  text-richblack-300 font-normal font-inter"> {description} </p>
            </div>

            <div className={`flex flex-row justify-between border-t pt-2 border-dashed 
                 ${active ? " text-blue-300 border-blue-400": "text-richblack-300 border-richblack-400"} `}>
                <div className="flex flex-row gap-2 justify-center items-center"> <MdPeople />  {level}</div>
                <div className="flex flex-row gap-2 justify-center items-center"> <FcFlowChart color="#838894"   /> {lessons}</div>
            </div>



        </div>
    )
}

export default CourseCard
