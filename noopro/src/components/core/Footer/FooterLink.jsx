import { Link } from "react-router-dom"

const FooterLink = ({link, text}) => {
  return (
    <Link  to={link}  >
        <div className=" text-richblack-100">{text}</div>
    </Link>
   
  )
}

export default FooterLink
