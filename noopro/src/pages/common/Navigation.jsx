import { Link, useLocation } from "react-router-dom"
import { NavbarLinks, ProfileDropDown, logo_nav } from "../../utils"
import { IoIosArrowDown } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {categories} from "../../services/apis"


const Navigation = () => {

    const location = useLocation();
    const token = useSelector((store) => store?.auth?.token)
    const user = useSelector((store) => store?.profile?.user)
    const totalItem = useSelector((store) => store?.cart?.totalItems);
    const [subLinks, setSubLinks] = useState([]);


    const dataFetch = async () => {
        fetch(categories.CATEGORIES_API)
            .then(res => res.json())
            .then(e => setSubLinks(e?.data))
            .catch(e => console.log("error in fetching ", e))
    }

    useEffect(() => {
        dataFetch()

    }, [])


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
                                                    <div className="relative group">
                                                        <div className=" relative flex flex-row gap-[1px] items-center  cursor-pointer">
                                                            {item.title}
                                                            <IoIosArrowDown />
                                                        </div>
                                                        {subLinks.length > 0 ?
                                                            <div className=" invisible group-hover:visible">
                                                                <div className="absolute  bg-richblack-5 w-[250px] 
                                                            -translate-x-[20%] translate-y-[20px] transition-all duration-200 rounded
                                                            ">
                                                                    <ul className=" text-richblack-900 font-bold font-edu-sa  px-7 flex flex-col gap-4 py-4">
                                                                        {subLinks.map((category, index) => {
                                                                            return <Link to={`/catalog/${category?.name}`}  key={index}>
                                                                            <li className=" cursor-pointer" > {category?.name}</li>
                                                                            </Link> 
                                                                        })}
                                                     

                                                                    </ul>

                                                                </div>

                                                                <div className=" absolute w-0 h-0  translate-x-11  rounded-t
                                                                                    border-l-[20px] border-l-transparent
                                                                                    border-b-[20px] border-richblack-5
                                                                                    border-r-[20px] border-r-transparent
                                                                                        duration-200 transition-all"
                                                                    >

                                                                </div>
                                                            </div>
                                                            : <div> </div>}





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
