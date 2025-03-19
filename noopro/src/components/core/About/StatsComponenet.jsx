import { statsData } from "../../../utils"


const StatsComponenet = () => {

  return (
    <div className=" w-full">
      <div className="  flex flex-row justify-between text-center flex-wrap">
        {
            statsData.map((data) => {
                return <div className=" "  key={data.name}>
                    <p className=" cursor-pointer text-richblack-25 font-inter font-semibold">{data.counting}</p>
                    <p className=" cursor-pointer text-richblack-300 font-inter">{data.name}</p>
                </div>})
        }
      </div>
    </div>
  )
}

export default StatsComponenet
