import TipsForAddingCourse from "./Components/TipsForAddingCourse";
import StepRender from "./StepRender";


const AddCourse = () => {
  return (
    <div className=" w-full min-h-screen">
       <div className=" pt-6">
       <div className=" flex flex-row justify-between gap-10 px-7" >
          <div className=" w-full">
                <StepRender />
          </div>
          <div className="">
                <TipsForAddingCourse />
          </div>
       </div>
       </div>
    </div>
  )
}

export default AddCourse;
