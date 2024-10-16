import { Link, useLocation } from "react-router-dom"
import { NavbarLinks, ProfileDropDown, logo_nav } from "../../utils"
import { IoIosArrowDown } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";


const Navigation = () => {

    const location = useLocation();
    const token = useSelector((store) => store?.auth?.token)
    const user = useSelector((store) => store?.profile?.user)
    const totalItem = useSelector((store) => store?.cart?.totalItems);

    // console.log(user, totalItem);


    return (
        <div className="w-full bg-richblue-900 border-b-richblue-5 border-b-[1px] ">
            <div className="w-11/12 mx-auto py-4">
                <div className="flex flex-row justify-between items-center content-center  text-richblack-25">

                    {/* logo */}

                    <div>
                        <Link to={"/"} >
                            <img
                                className=" h-7"
                                src={logo_nav}

                            />
                        </Link>
                    </div>



                    {/* navigation bar */}
                    <nav>
                        <ul className="flex flex-row gap-3 text-richblue-5 ">

                            {
                                NavbarLinks.map((item) => {
                                    return (
                                        <li
                                            className={`${location.pathname === item.path ? " text-yellow-5" : ""}`}
                                            key={item.title}>
                                            {item.title == "Catalog" ?
                                                (
                                                    <div className="relative">
                                                        <div className="flex flex-row gap-[1px] items-center  cursor-pointer">
                                                            {item.title}
                                                            <IoIosArrowDown />
                                                        </div>

                                                        {/* <ul className="bg-white w-[290px] hidden group-hover:flex -ml-20 mt-[18px] rounded-lg text-richblack-900 absolute  flex-col gap-5 p-8">
                                                            <li className="hover:bg-richblack-50 rounded-lg pl-4 py-2 pr-16 text-left">Python </li>
                                                            <li className="hover:bg-richblack-50 rounded-lg pl-4 py-2 pr-16 text-left">Web devlopment</li>
                                                            <li className="hover:bg-richblack-50 rounded-lg pl-4 py-2 pr-16 text-left">Linux</li>
                                                            </ul> 
                                                        */}



                                                    </div>
                                                ) :
                                                (
                                                    <Link to={item.path} >
                                                        {item.title}
                                                    </Link>
                                                )
                                            }

                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </nav>


                    <div className="flex flex-row gap-4">

                        {/* profile / login-logout */}


                        {
                            user && user.accountType != "Instructor" && (
                                <Link to="/dashboard/cart" >
                                    <div className="relative">
                                        <TiShoppingCart />

                                        {totalItem &&
                                            <span>{totalItem}</span>
                                        }

                                    </div>

                                </Link>
                            )
                        }

                        {/* login / signup */}
                        {
                            token == null && (
                                <Link to="/login">
                                    <button className=" px-4 py-1  rounded-sm bg-richblue-500 border border-richblack-500">Log in</button>
                                </Link>
                            )
                        }

                        {
                            token == null && (
                                <Link to="/signup" >
                                    <button className=" px-4 py-1  rounded-sm bg-richblue-500 border border-richblack-500">Sing up</button>
                                </Link>
                            )
                        }



                        

                        {/* profile */}
                        {
                            token != null && (
                                <ProfileDropDown />
                            )
                        }
                        {/* card  */}

                    </div>


                </div>
            </div>

        </div>
    )
}

export default Navigation
