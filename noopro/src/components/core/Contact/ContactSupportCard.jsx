

const ContactSupportCard = ({icon, heading, details, adress}) => {
  return (
    <div className="font-inter flex flex-row gap-4  ">
      <div className=" text-pure-greys-100">
        {icon}
      </div>
      <div>
        <h2 className=" text-pure-greys-5 text-lg  font-medium">{heading}</h2>
        <p className=" text-pure-greys-100 font-thin">{details}</p>
        <p className=" text-pure-greys-100 font-thin">{adress}</p>
      </div>
    </div>
  )
}

export default ContactSupportCard
