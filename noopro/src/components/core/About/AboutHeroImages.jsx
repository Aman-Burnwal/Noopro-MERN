
import { AboutHeroImg1, AboutHeroImg2 , AboutHeroImg3 } from "../../../utils"

const AboutHeroImages = () => {

  const imges = [AboutHeroImg1, AboutHeroImg2, AboutHeroImg3]
  return (
    <div className=" translate-y-20 pt-10 flex flex-row flex-wrap justify-center gap-3">
        {
          imges.map((img, index) => {
            return <img className=" object-fill h-72"  src={img} key={index} />
            
          })
        }
    </div>
  )
}

export default AboutHeroImages;
