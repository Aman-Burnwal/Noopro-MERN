// import Higlighter from "./Highlighter"
import { useState } from "react"
import { Higlighter, HomePageTags, HomePageExplore, CourseCard } from "../../../utils/index"



const ExploreCourse = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [activeCard, setActiveCard] = useState(0);
    const [cardData, setCardData] = useState(HomePageExplore[0].courses);
    console.log(cardData);

    const updateData = (ind, tag) => {
        setActiveTab(() => ind);
        const data = HomePageExplore.filter((ele) => ele.tag == tag)
        setCardData(() => data[0].courses);
        setActiveCard(0);
    }

    return (
        <div className="w-11/12 text-richblack-5 mt-20 pb-4 mx-auto flex flex-col items-center  ">

            <h1 className=" font-semibold text-4xl">Unlock the  <Higlighter text={" Power of Code"} /> </h1>
            <p className=" font-medium text-richblack-300 pt-1">Learn to Build Anything You Can Imagine</p>

            <div className="text-richblack-300 bg-richblue-700 rounded-full 
            shadow-[0_2.5px_rgba(255,255,255,0.25)] transition-all duration-200 
                flex flex-row gap-10 px-4 py-1 mt-5 font-semibold text-lg">

                {
                    HomePageTags.map((ele, ind) => {
                        return <div
                            className={` px-5 py-2 rounded-full hover:bg-richblack-900 hover:text-richblack-5
                                transition-all duration-200 cursor-pointer hover:scale-95
                                ${activeTab == ind ? " text-richblack-5 bg-richblack-900" : ""}`}
                            key={ind}
                            onClick={() => updateData(ind, ele)}
                        >{ele}


                        </div>
                    }
                    )
                }
            </div>

            <div className="flex flex-row gap-20">
                {cardData.map((card, ind) => {

                    return <div key={ind} onClick={() => setActiveCard(() =>ind)}>
                        <CourseCard

                            heading={card.heading}
                            description={card.description}
                            level={card.level}
                            lessons={card.lessionNumber}
                            active={activeCard == ind}

                        />
                    </div>
                })}
            </div>

            <div>

            </div>


        </div>
    )
}

export default ExploreCourse
