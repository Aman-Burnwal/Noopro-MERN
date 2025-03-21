import { useState } from "react";
import { CountryCode } from "../../../utils";


const ContactForm = () => {



    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+91",
        phoneNumber: "",
        message: "",
        errorMessage: ""

    })
    const handleChange = (e) => {

        // console.log("handleChange called");

        let { name, value } = e.target;
        if (name != "message") value = value.trim();

        if (name === "phoneNumber" && (isNaN(Number(value)) || e.key == "e" || e.key == "E" || e.key == "+" || e.key == "-")) return;


        // console.log(name, value);


        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))


    }
    const handleSubmit = (e) => {

        e.preventDefault();

        const { firstName, lastName, email, countryCode, phoneNumber, message } = formData;

        if (!firstName || !lastName || !email || !countryCode || !phoneNumber || !message) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Please fill all the fields"
            }))
            return;
        }

        if (firstName.length < 3 || lastName.length < 3) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Please enter a valid name"
            }))
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setFormData({ ...formData, errorMessage: "Invalid email format" })
            return
        }

        const phoneRegex = /^\d{10}$/;

        if (phoneNumber.length != 10 || !phoneRegex.test(phoneNumber)) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Please enter a valid phone number"
            }))
            return;
        }

        if (message.length < 10) {
            setFormData((prev) => ({
                ...prev,
                errorMessage: "Please enter a valid message"
            }))
            return;
        }

        console.log("Form submitted successfully", formData);

        setFormData(() => ({
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "+91",
            phoneNumber: "",
            message: "",
            errorMessage: ""
        }))
        return;


    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>

            <div className=" w-8/12 mx-auto flex flex-col gap-5 justify-center  text-white ">

                {/* Name */}
                <div className=" flex flex-row gap-7">
                    <div className=" flex flex-col ">
                        <label className=" pb-1 font-medium font-inter" htmlFor="firstName" >First Name</label>
                        <input
                            className="px-6 py-3  rounded-lg  font-medium  text-richblack-900  drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]"

                            name="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleChange(e)}
                            placeholder="First Name"
                            maxLength={10}
                            required={true}
                        >

                        </input>
                    </div>

                    <div className=" flex flex-col">
                        <label className=" pb-1 font-medium font-inter"  htmlFor="lastName" >Last Name</label>
                        <input
                            className="px-6 py-3  rounded-lg  font-medium  text-richblack-900  drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]"

                            name="lastName"
                            required={true}
                            value={formData.lastName}
                            onChange={(e) => handleChange(e)}
                            placeholder="last Name"
                            maxLength={10}
                        >

                        </input>
                    </div>


                </div>

                <div className=" flex flex-col">
                    <label className=" pb-1 font-medium font-inter"  htmlFor="email" >Email</label>
                    <input
                        className="px-6 py-3  rounded-lg  font-medium  text-richblack-900  drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]"

                        name="email"
                        type="email"
                        required={true}
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your email"

                    >

                    </input>
                </div>

                <div className=" flex flex-col gap-1 ">
                    <label className=" py-1 font-medium font-inter"  htmlFor="Phone number" >Phone Number</label>

                    <div className=" flex flex-row gap-5">
                        <select
                            value={formData.countryCode}  
                            onChange={(e) => handleChange(e)}
                            name="countryCode"

                            // className="  border border-gray-300 text-black w-20 px-4 py-2 pr-8 rounded-lg  "
                            className="text-black  rounded w-20 drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]  pl-1   "
                        >
                            {CountryCode.map((data, index) => (
                                <option key={index} value={data.code} className="bg-richblack-800 text-white">
                                    {data.code} 
                                </option>
                            ))}
                        </select>


                        <input

                            onChange={(e) => handleChange(e)}
                            className="px-6 py-3 lining-nums  rounded-lg  font-medium  placeholder:pl-0 text-richblack-900  drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]"
                            required={true}
                            maxLength={10}

                            name="phoneNumber"
                            type="text"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            placeholder="123456890"
                            value={formData.phoneNumber}

                        >

                        </input>
                    </div>

                </div>

                <div className="flex flex-col">
                    <label className=" pb-1 font-medium font-inter"  htmlFor="Message">Message</label>
                    <textarea
                        type="text"
                        onChange={(e) => handleChange(e)}
                        name="message"
                        required={true}
                        maxLength={500}
                        className="px-6 py-3  rounded-lg  font-medium text-center text-richblack-900  drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]"
                        placeholder="Enter your message here"
                        value={formData.message}

                    ></textarea>
                </div>


                <button
                    type="submit"
                    className={`group px-6 py-3  rounded-lg  font-medium text-center
                    hover:scale-95 transition-all duration-200 drop-shadow-[2px_1.5px_rgba(255,255,255,0.25)]
                    bg-yellow-50 text-richblack-900  `}
                >
                    <div className=" leading-6  transition-all duration-200 group-hover:scale-95">
                        Sumbit message
                    </div>

                </button>

                {
                    formData.errorMessage && <div className=" text-white"> {formData.errorMessage} </div>
                }


            </div>


        </form>
    )
}

export default ContactForm
