import { HiglightBtn, Higlighter} from "../../../utils/index"
import  knowyourProgress from "../../../assets/Images/Know_your_progress.svg"
import compareWithOthers from "../../../assets/Images/Compare_with_others.svg"
import planYourLessons from "../../../assets/Images/Plan_your_lessons.svg"

const KnowMoreSection = () => {
  return (
    <div className="flex flex-col items-center gap-6 mt-10 w-full ">
       <div className=" w-8/12 mx-auto  font-inter  ">
            <h1 className=" font-semibold text-4xl text-center text-richblack-900 tracking-[-2%]">Your swiss knife for <Higlighter text={" learning any language"} /> </h1>
            <p className=" font-medium px-8 text-richblack-700 pt-2  text-center">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, 
                progress tracking, custom schedule and more.
            </p>
       </div>
       <div className="flex flex-row  justify-center items-center w-11/12 mx-auto pl-20  ">

       <img className=" translate-x-24  scale-95 " src={knowyourProgress} loading={"lazy"} />
       <img className=" -translate-x-12   scale-90" src={compareWithOthers} loading={"lazy"} />
       <img className="-translate-x-56   scale-90" src={planYourLessons} loading={"lazy"} />
         
       </div>
       <HiglightBtn text={"Learn more"}  active={true} link={"/signUp"}/>
    </div>
  )
}

export default KnowMoreSection
