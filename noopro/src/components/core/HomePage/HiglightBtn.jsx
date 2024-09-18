import { Link } from "react-router-dom"


const HiglightBtn = ({active , link, text}) => {
  return (
    <Link link to= {link}>
      <button className={`group px-6 py-3  rounded-lg  font-medium text-center
         hover:scale-95 transition-all duration-200 drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]
          ${active ? " bg-yellow-50 text-richblack-900" : "bg-richblack-700 text-white"} `}>
           <div className=" leading-6  transition-all duration-200 group-hover:scale-95">
            {text}
           </div>

      </button>
    </Link>
  )
}

export default HiglightBtn
