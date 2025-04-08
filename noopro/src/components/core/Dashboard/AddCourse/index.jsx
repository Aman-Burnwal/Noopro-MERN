import TipsForAddingCourse from "./Components/TipsForAddingCourse";
import StepRender from "./StepRender";


const AddCourse = () => {
  return (
    <div className=" w-full min-h-screen">
       <div className=" grid grid-col-6 gap-5" >
          <div>
                <StepRender />
          </div>
          <div>
                <TipsForAddingCourse />
          </div>
       </div>
    </div>
  )
}

export default AddCourse;
