import { AboutUsData, Higlighter } from "../../../utils"


const AboutUs = () => {

  return (
    <div className=" grid md:grid-cols-2 gap-7  text-richblack-300">
      {
        AboutUsData.map((data) => {
            return <div className="flex flex-col gap-4" key={data.key}>
                {data.heading && <Higlighter text={data.heading}  color={data.color}/>}
                {data.para1 && <p>{data.para1}</p>}
                {data.para2 && <p>{data.para2}</p>}
                {data.image && <img className="object-fit" src={data.image}/>}
            </div>
        })
      }
    </div>
  )
}

export default AboutUs
