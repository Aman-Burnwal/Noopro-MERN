import { HiglightBtn, Higlighter, LearnGridData } from "../../../utils"


const LearnGrid = () => {
  return (
    <div className=" grid   md:grid-cols-3 lg:grid-cols-4  justify-between gap-5 text-white">
      {
        LearnGridData.map((data) => {
          return (

            data.order == 0

              ? <div key={data.order} className=" sm:col-span-2 flex flex-col gap-6 bg-transparent p-5">
                <h2 className=" text-3xl font-medium">{data.heading} <Higlighter text={data.higlight} /> </h2>
                <p className=" font-thin text-pure-greys-100">{data.description}</p>
                <div><HiglightBtn text={data.btn} active={true} link={"/"} /> </div>
              </div>

              : <div key={data.order} className={`${data.order == 3 ? "  col-start-2" : ""} ${data.order % 2 ? " bg-richblack-50 bg-opacity-20" : "bg-richblack-600 bg-opacity-30"} flex flex-col  gap-4 px-10 py-5`}>
                <h2 className=" h-12">{data.heading}</h2>
              
                <p className=" font-thin text-pure-greys-100 ">{data.description}</p>
              </div>

          )
        })
      }
    </div>
  )
}

export default LearnGrid
