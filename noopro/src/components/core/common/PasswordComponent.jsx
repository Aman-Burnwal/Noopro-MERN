import { useState } from "react"
import { BiShow } from "react-icons/bi"


const PasswordComponent = ({handler, password , text }) => {

  const [type, setType] = useState("password");
  const displayHandler = () => {
    if(type == "text") setType(() => "password");
    else setType(() => "text")
  }
  return (
    <div 
     onChange={() => handler()}
    className=" relative flex flex-col gap-2 text-caribbeangreen-900 w-fit ">
      <label htmlFor="password" >{text}</label>
      
      <input
        
        className="relative" 
        type={type}
         value={password}
         autoComplete={text}
        >
        </input>
        <span className=" absolute right-3 top-9 " onClick={() => displayHandler()}> <BiShow /> </span>
    </div>
  )
}

export default PasswordComponent