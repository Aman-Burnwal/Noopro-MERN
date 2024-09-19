import { HiglightBtn } from "../../../utils/index"

import { TypeAnimation } from 'react-type-animation';


const Preview = ({ btn1, btn2, heading, paragraph, align, codeblock, codeColor , backgroundImg, typeSpeed, deleteSpeed }) => {


  return (
    <div className={`flex ${align} justify-between items-center`}>

      {/* left part */}

      <div className="flex flex-col gap-2 w-1/2">

        {heading}

        {paragraph}

        <div className="flex flex-row gap-8 pt-10">
          <HiglightBtn link={btn1?.link} text={btn1?.text} active={btn1.active} />
          <HiglightBtn link={btn2?.link} text={btn2?.text} active={btn2.active} />
        </div>


      </div>

      {/* auto typing */}

      <div className="w-2/5 rounded border bg-transparent   border-richblue-400 px-4 py-3 font-mono relative " >

         {/* background gradient */}

         {backgroundImg}


        <div className="flex flex-row gap-2 justify-center  w-fit font-mono text-sm font-bold relative z-20 ">

         

          <div className="text-richblack-200 ">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
          </div>

          <div className={`${codeColor} `}>
            <TypeAnimation
              sequence={[codeblock, 1000, ""]}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={false}
              style={
                {
                  whiteSpace: "pre-line",
                  display: "block"

                }
              }
              speed={typeSpeed}
              deletionSpeed={deleteSpeed}
            />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Preview
