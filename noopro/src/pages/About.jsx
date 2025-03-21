
import { AboutHeroImages, AboutUs, ContactForm, Footer, Higlighter, LearnGrid, StatsComponenet } from "../utils"


const About = () => {
    return (
        <div className=" w-full min-h-screen bg-richblack-800 ">

            {/* section 1 */}
            <section className="">

                <header className=" bg-richblue-700 min-h-screen">
                    <div className="w-11/12 mx-auto">
                        <div className=" pt-20 w-7/12 mx-auto  text-center ">

                            <p className=" text-pure-greys-100">About us</p>

                            <div className=" pt-8  text-white text-3xl leading-10 font-semibold font-inter ">
                                Driving Innovation in Online Education for a <Higlighter text={"Brighter Future"} />
                            </div>

                            <p className="pt-8  text-pure-greys-100">Studynotion is at the forefront of driving innovation in online education. We&apos;re passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

                        </div>

                        <AboutHeroImages />
                    </div>


                </header>
            </section>

            {/* section 2 */}
            <section >
                <div className=" py-28 w-9/12   mx-auto text-white border-b ">

                    <div className="relative  text-pure-greys-300 items-center px-1 py-1 ">


                        <p className="text-3xl font-medium font-inter  leading-relaxed">
                            <span className=" font-mono text-4xl font-extrabold">&ldquo;</span>
                            We are passionate about revolutionizing the way we learn. Our innovative platform
                            <Higlighter text={" combines technology"} color={"from-[#1E90FF] to-[#00CFFF]"} />,
                            <Higlighter text={" expertise"} color={"from-[#FF8C00] to-[#FFA500]"} />,
                            and community to create an
                            <Higlighter text={" unparalleled educational experience."} color={"from-[#FFA500] to-[#FFD700]"} />
                            <span className=" font-mono text-4xl font-extrabold">&rdquo;</span>
                        </p>
                   
                    </div>


                </div>
            </section>

            {/* section 3 */}
            <section>
                <div className=" w-9/12 mx-auto py-14">
                    <AboutUs />
                </div>
            </section>

            {/* section 4 */}
            <section >
                <div className="w-9/12 mx-auto pb-14">
                    <StatsComponenet />
                </div>
            </section>

            {/* section 5 */}
            <section>
                <div className="w-full px-2 pb-14">
                    <LearnGrid />
                    
                </div>
            </section>

            {/* section 6 */}

            <div className=" w-full py-14">
                <div className=" w-8/12  py-14 mx-auto  rounded-lg  bg-richblack-600">
                    <p className=" text-3xl font-semibold text-white text-center">Get in Touch</p>
                    <p className=" text-pure-greys-100 text-center pt-4 pb-20">We&lsquo;d love to here for you, Please fill out this form.</p>
                    <ContactForm />
                </div>
            </div>

            {/* section 7 */}
            <div className=" w-full">
                <Footer />
            </div>
        </div>
    )
}
export default About