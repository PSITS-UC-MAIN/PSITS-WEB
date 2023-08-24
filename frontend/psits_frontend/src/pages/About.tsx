import { Slide } from "react-slideshow-image";

import Wrapper from "@/components/Wrapper";
import { trinitylogo } from "@/assets";
import { aboutBannerImages, alumniShoutoutBannerImages, aboutUs } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dummyData = [
  {
    id: 2323,
    name: "Kean Jieden Villaflor",
    position: "Volunteer",
  },
  {
    id: 2324,
    name: "Darelle Gochuico",
    position: "Volunteer",
  },
  {
    id: 2325,
    name: "Kean Jieden Villaflor",
    position: "Volunteer",
  },
  {
    id: 2326,
    name: "Darelle Gochuico",
    position: "Volunteer",
  },
  {
    id: 2327,
    name: "Kean Jieden Villaflor",
    position: "Volunteer",
  },
  {
    id: 2328,
    name: "Darelle Gochuico",
    position: "Volunteer",
  },
];

const About = () => {
  return (
    <Wrapper noMargin title="PSITS | About Us">
      <div className="mt-10 mx-20 rounded">
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
      <div className="m-20 rounded">
        <h1 className="text-4xl font-medium mb-4 text-[#074873]">Students Alumni Shoutouts!</h1>
        <Slide indicators>
          {alumniShoutoutBannerImages.map((slideImage) => (
            <div
              key={slideImage.name}
              className="flex items-center justify-center rounded h-[600px] bg-cover bg-center"
              style={{ backgroundImage: `url(${slideImage.banner})` }}
            />
          ))}
        </Slide>
      </div>
      <div className="m-20">
        <h1 className="text-4xl font-medium mb-4 text-[#074873]">PSITS OFFICERS</h1>
        <div className="flex gap-4 flex-wrap justify-center">
          {dummyData.map((data) => {
            return (
              <Card key={data.id} className="w-[300px] text-center">
                <CardHeader>
                  <CardTitle>
                    <div className="bg-gray-200 h-[200px] rounded" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="uppercase">
                  <h1 className="text-xl font-semibold">{data.name}</h1>
                  <p className="text-[#074873] font-medium">{data.position}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
