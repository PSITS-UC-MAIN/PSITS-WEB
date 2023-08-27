import { Slide } from "react-slideshow-image";

import Wrapper from "@/components/Wrapper";
import { trinitylogo } from "@/assets";
import { aboutBannerImages, alumniShoutoutBannerImages, aboutUs } from "@/constants";

const About = () => {
  return (
    <Wrapper noMargin title="PSITS | About Us">
      <div className="mt-10 mx-[150px] rounded">
        <Slide indicators>
          {aboutBannerImages.map((slideImage) => (
            <div
              key={slideImage.name}
              className="flex items-center justify-center rounded h-[500px] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${slideImage.banner})` }}
            />
          ))}
        </Slide>
      </div>
      <div className="my-20 flex items-center justify-evenly w-full bg-[#074873]">
        <div className="flex flex-col p-4 rounded text-white w-[600px]">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="">
            &emsp;
            {aboutUs}
          </p>
        </div>
        <img src={trinitylogo} alt="PSITS Logo" />
      </div>
      <div className="my-20 mx-[150px] rounded">
        <h1 className="text-4xl font-medium mb-4 text-[#074873]">Students Alumni Shoutouts!</h1>
        <Slide indicators>
          {alumniShoutoutBannerImages.map((slideImage) => (
            <div
              key={slideImage.name}
              className="flex items-center justify-center rounded h-[500px] bg-cover bg-center"
              style={{ backgroundImage: `url(${slideImage.banner})` }}
            />
          ))}
        </Slide>
      </div>
    </Wrapper>
  );
};

export default About;
