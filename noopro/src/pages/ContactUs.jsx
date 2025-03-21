import { FaMessage, FaPhone } from "react-icons/fa6"
import { ContactForm, ContactSupportCard, Footer } from "../utils"
import { GiWorld } from "react-icons/gi"


const ContactUs = () => {

  const data = [
    {
      icon : <FaMessage className="" />,
      heading: "Chat on us",
      detalis: "Our friendly team is here to help.",
      adress: "@mail address"
    },
    {
      icon: <GiWorld />,
      heading: "Visit us",
      detalis: "Come and say hello at our office HQ.",
      adress: "Here is the location/ address"
    },
    {
      icon: <FaPhone />,
      heading: "Call us",
      detalis: "Mon - Fri From 8am to 5pm",
      adress: "+123 456 7890"
    }

  ]

  return (
    <div className=" w-full bg-richblack-900">

      <div className=" py-24 px-12  grid grid-cols-6 gap-8 ">

        <div className=" col-span-2 flex flex-col gap-3 bg-richblack-700  rounded-lg h-fit w-fit px-6 py-9">
          {
            data.map((d) =>  <ContactSupportCard key={d.heading} heading={d.heading} icon={d.icon} details={d.detalis} adress={d.adress} />)
          }
        </div>

        <div className=" px-6 py-11 rounded-lg border border-white col-span-4 w-full ">
          <h1 className=" w-8/12 mx-auto text-richblue-5 text-3xl font-inter font-semibold pt-4">Got a Idea? We’ve got the skills. Let’s team up</h1>
          <p className="w-8/12 mx-auto text-pure-greys-100  font-inter pb-4 font-thin ">Tall us more about yourself and what you’re got in mind.</p>
          <ContactForm />
        </div>

      </div>
      
      <Footer />
    </div>
  )
}

export default ContactUs
