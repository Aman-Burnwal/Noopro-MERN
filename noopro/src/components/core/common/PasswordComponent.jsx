import { useState } from "react"
import { BiHide, BiShow } from "react-icons/bi"


const PasswordComponent = ({setPssword, password , text , placeHolder, id}) => {

  const [type, setType] = useState("password");
  const displayHandler = () => {
    if(type == "text") setType(() => "password");
    else setType(() => "text")
  }
  return (
    <div 
     
    className=" relative flex flex-col gap-2 text-caribbeangreen-900 w-fit  ">
      <label 
        className="  text-richblack-25  "
       htmlFor={id} >{text}</label>
      
      <input
        
        className=" relative rounded-lg w-fit bg-richblue-25 pl-3 py-3
         placeholder:text-richblue-200 placeholder:text-sm " 
         type={type}
         value={password}
         autoComplete={text}
         placeholder={placeHolder}
         onChange={(e) => setPssword(e.target.value)}
         id={id}
        >
        </input>
        <span className=" absolute right-3 top-12 cursor-pointer " onClick={() => displayHandler()}>{type == "password" ?  <BiShow className=" " /> : <BiHide />} </span>
    </div>
  )
}

export default PasswordComponent