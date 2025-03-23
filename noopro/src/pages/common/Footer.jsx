import { FaFacebook, FaTwitter } from "react-icons/fa6"
import { FooterLink, FooterLink2, logo_nav } from "../../utils"
import { FaInstagram } from "react-icons/fa"


const Footer = () => {
  return (
    <div className="w-full  bg-richblack-900 ">

      <div className=" w-10/12 mx-auto py-36">

        {/* All links */}

        <div className=" grid  grid-cols-2 gap-8 justify-between ">

          {/* left */}
          <div className="col-span-1   ">
            <div className=" grid  grid-cols-3 justify-between gap-8">

              <div className=" flex flex-col col-span-1 gap-1">
                <img src={logo_nav} className=" object-cover w-40" alt="Comapany Logo" />
                <h2 className=" text-pure-greys-5 py-2 font-inter font-medium">Company</h2>
                <FooterLink text={"About"} link={"/about"} />
                <FooterLink text={"Carrers"} link={"/career"} />
                <FooterLink text={"Affilates"} link={"/affilates"} />
                <div className=" flex flex-wrap gap-4">
                  <FooterLink text={<FaFacebook className="  h-5 w-fit" />} link={"/#"} />
                  <FooterLink text={<FaTwitter className="  h-5 w-fit" />} link={"/#"} />
                  <FooterLink text={<FaInstagram className="  h-5 w-fit" />} link={"/#"} />
                  <FooterLink text={<FaFacebook className="  h-5 w-fit" />} link={"/#"} />


                </div>

              </div>
              <div className=" flex flex-col col-span-1 gap-1">
                <h2 className=" text-pure-greys-5 py-2 font-inter font-medium">Resources</h2>
                <FooterLink text={"Articles"} link={"/#"} />
                <FooterLink text={"Blog"} link={"/#"} />
                <FooterLink text={"Chart Sheet"} link={"/#"} />
                <FooterLink text={"Code challenges"} link={"/#"} />
                <FooterLink text={"Docs"} link={"/#"} />
                <FooterLink text={"Projects"} link={"/#"} />
                <FooterLink text={"Videos"} link={"/#"} />
                <FooterLink text={"Workspaces"} link={"/#"} />

                <h2 className=" text-pure-greys-5 py-2 font-inter font-medium pt-8">Support</h2>
                <FooterLink text={"Help Center"} link={"/contact"} />
              </div>
              <div className=" flex flex-col col-span-1 gap-1">
                <h2 className=" text-pure-greys-5 py-2 font-inter font-medium">Plans</h2>
                <FooterLink text={"Paid membership"} link={"/#"} />
                <FooterLink text={"For Student"} link={"/login"} />
                <FooterLink text={"Business solutions"} link={"/#"} />


                <h2 className=" text-pure-greys-5 py-2 font-inter font-medium pt-8">Community</h2>
                <FooterLink text={"Forums"} link={"/contact"} />
                <FooterLink text={"chapter"} link={"/#"} />
                <FooterLink text={"Events"} link={"/#"} />

              </div>
            </div>
          </div>


          {/* right */}

          <div className=" col-span-1 grid grid-cols-3 gap-8">
            {
              FooterLink2.map((data) => {
                return (
                  <div className=" col-span-1 flex flex-col gap-2" key={data.title}>
                    <h2 className="text-pure-greys-5 py-4 font-inter font-medium">{data.title}</h2>

                    {
                      data.links.map((links) => <FooterLink key={links.title} text={links.title} link={links.link} />)
                    }
                  </div>
                )
              }
              )
            }
          </div>

        </div>


        {/* bottom */}
        <div>

        </div>
      </div>


    </div>
  )
}

export default Footer
