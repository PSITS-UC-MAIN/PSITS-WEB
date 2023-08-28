import { Slide } from "react-slideshow-image";

import Wrapper from "@/components/Wrapper";
import { trinitylogo, aboutUsUCTransparent, ccsLogo } from "@/assets";
import { aboutBannerImages, alumniShoutoutBannerImages } from "@/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const About = () => {
  return (
    <Wrapper noMargin title="PSITS | About Us">
    <div className="flex flex-col gap-y-20">
        <div className="mt-20 mx-[150px] rounded">
            <Slide indicators>
            {aboutBannerImages.map((slideImage) => (
                <div
                key={slideImage.name}
                className="flex items-center justify-center rounded h4-[500px] bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${slideImage.banner})` }}
                />
            ))}
            </Slide>
        </div>
        <div className="flex items-center justify-evenly w-full bg-[#074873]">
            <div className="flex flex-col p-4 rounded text-white w-[600px]">
            <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
            <p className="flex flex-col items-center">
                &emsp;
                <span>PSITS - University of Cebu-Main Campus Chapter</span>
                <span>the Official School Organization for College of Computer Studies</span>
                <span>BSIT-BSCS-ACT Students</span>
            </p>
            </div>
            <img src={trinitylogo} alt="PSITS Logo" />
        </div>
        <div className="flex flex-row mx-[150px] gap-x-10">
            <Card className="flex items-center w-full border-0 text-center bg-gradient-to-r from-[#268EA7] to-[#254872] text-white">
                <CardContent>
                    <div className="flex flex-col gap-y-10">
                        <span className="text-4xl font-medium text-[#FBF12F]">MISSION</span>
                        <p className="word-break">
                            The University offers affordable and quality education responsive to the demands of local and international communities.
                        </p>
                    </div>
                </CardContent>
            </Card>
            <img src={aboutUsUCTransparent} alt="UC Logo" className="w-[30%]" />
            <Card className="flex items-center w-full border-0 text-center bg-gradient-to-r from-[#254872] to-[#268EA7] text-white">
                <CardContent>
                    <div className="flex flex-col gap-y-10">
                        <span className="text-4xl font-medium text-[#FBF12F]">VISION</span>
                        <p className="word-break">
                            Democratize quality education. Be the visionary and industry leader. Give hope and transform lives.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="flex flex-row mx-[150px] items-center gap-x-10">
            <Card className="flex items-center w-full h-[400px] border-0 text-center bg-gradient-to-r from-[#254872] to-[#268EA7] text-white">
                <CardContent>
                    <div className="flex flex-col gap-y-10 p-5">
                        <span className="text-4xl font-medium">MISSION</span>
                        <p className="word-break text-xs">
                            We envision being the hub of quality, globally-competitive and socially-responsive information technology education
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className="flex items-center w-full h-[500px] border-0 text-center bg-gradient-to-r from-[#254872] to-[#268EA7] text-white">
                <CardContent>
                    <div className="flex flex-col gap-y-10 p-5">
                        <span className="text-4xl font-medium">VISION</span>
                        <p className="word-break text-xs text-start">
                            <span className="font-bold text-start">We commit to continuously:</span><br/><br/>
                            Offer relevant programs that mold well-rounded computing professionals;<br/><br/>
                            Engage in accreditation and quality standards;<br/><br/>
                            and Facilitate in building an IT-enabled nation.
                        </p>
                    </div>
                </CardContent>
            </Card>
            <img src={ccsLogo} alt="CCS Logo" className="w-[20%]"/>
            <Card className="flex items-center w-full h-[500px] border-0 text-center bg-gradient-to-r from-[#268EA7] to-[#254872] text-white">
                <CardContent>
                    <div className="flex flex-col gap-y-10 p-5">
                        <span className="text-4xl font-medium">GOALS</span>
                        <p className="word-break text-xs text-start">
                            <span className="font-bold">We aim to cultivate a teaching-learning environment that:</span><br/><br/>
                            Promotes scholarly endeavors for the promotion of moral,
                            social, cultural, and environmental interests;<br/><br/>
                            Meets the demands of the industry in terms of technical,
                            personal and interpersonal skills;<br/><br/>
                            Conducts intellectual, technological and significant
                            researches in computing; and<br/><br/>
                            Optimizes the use of appropriate and
                            advanced resources and services.
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className="flex items-center w-full h-[400px] border-0 text-center bg-gradient-to-r from-[#268EA7] to-[#254872] text-white">
                <CardContent>
                    <div className="flex flex-col gap-y-10 p-5">
                        <span className="text-4xl font-medium">CORE VALUES</span>
                        <p className="word-break text-xs text-start">
                            <span className="font-bold">These are the core values that CCS believes in:</span><br/><br/>
                            <span className="font-bold">Initiative (inceptum)</span>
                            wit, practicality, ingenuity<br/><br/>
                            <span className="font-bold">Innovation (innovatio)</span>
                            technology, creativity, novelty<br/><br/>
                            <span className="font-bold">Service (muneris)</span>
                            industry, loyalty, courtesy
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="mx-[150px] rounded mb-20">
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
    </div>
    </Wrapper>
  );
};

export default About;