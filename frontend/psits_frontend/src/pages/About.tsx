import { Slide } from "react-slideshow-image";
import { motion } from "framer-motion";

import Wrapper from "@/components/Wrapper";
import { aboutUsUCTransparent, ccsLogo } from "@/assets";
import { aboutBannerImages } from "@/constants";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <Wrapper noMargin title="PSITS | About Us" className="mt-10">
      <div className="mx-[150px] rounded mb-20">
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
      <div className="bg-[#ddd75b] w-full h-[10px]" />
      <div className="flex items-center justify-evenly w-full mb-20 bg-[#074873] h-[400px]">
        <div className="flex flex-col p-4 rounded text-white w-[600px]">
          <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
          <p className="flex flex-col items-center">
            <span>PSITS - University of Cebu-Main Campus Chapter</span>
            <span>the Official School Organization for College of Computer Studies</span>
            <span>BSIT-BSCS-ACT Students</span>
          </p>
        </div>
        <img src="./logo/psits_logo.png" alt="PSITS Logo" className="h-[300px]" />
      </div>
      <div className="mb-20 mx-[150px] text-center overflow-hidden">
        <motion.div
          className="flex gap-10 items-center"
          animate={{ x: -1920 }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="flex justify-start gap-6">
            <Card className="w-[300px]">
              <CardHeader>
                <div className="bg-slate-400 h-[400px]" />
              </CardHeader>
            </Card>
            <Card className="w-[300px]">
              <CardHeader>
                <div className="bg-slate-400 h-[400px]" />
              </CardHeader>
            </Card>
            <Card className="w-[300px]">
              <CardHeader>
                <div className="bg-slate-400 h-[400px]" />
              </CardHeader>
            </Card>
            <Card className="w-[300px]">
              <CardHeader>
                <div className="bg-slate-400 h-[400px]" />
              </CardHeader>
            </Card>
            <Card className="w-[300px]">
              <CardHeader>
                <div className="bg-slate-400 h-[400px]" />
              </CardHeader>
            </Card>
            <Card className="w-[300px]">
              <CardHeader>
                <div className="bg-slate-400 h-[400px]" />
              </CardHeader>
            </Card>
          </div>
        </motion.div>
      </div>
      <div className="bg-[#f5e5cf] mb-20 w-full h-[500px] px-[150px] py-[100px] flex items-center justify-between">
        <div className="flex flex-col gap-4 w-[400px]">
          <span className="text-5xl font-bold text-[#074873]">MISSION</span>
          <p className="word-break text-lg">
            The University offers affordable and quality education responsive to the demands of local and international
            communities.
          </p>
        </div>
        <div className="rounded-full bg-white w-[300px] h-[300px] p-6 shadow-lg border border-slate-400 flex justify-center items-center">
          <img src={aboutUsUCTransparent} alt="UC Logo" className="object-contain" />
        </div>
        <div className="flex flex-col gap-4 w-[400px]">
          <span className="text-5xl font-bold text-[#074873]">VISION</span>
          <p className="word-break text-lg">
            Democratize quality education. Be the visionary and industry leader. Give hope and transform lives.
          </p>
        </div>
      </div>
      <div className=" justify-center flex mb-5">
        <img src={ccsLogo} alt="CCS Logo" />
      </div>
      <div className="mb-20 flex mx-[100px] justify-center text-start gap-4">
        <div className="flex flex-col h-[400px] gap-2 p-4 w-[400px]">
          <h1 className="text-4xl font-bold">MISSION</h1>
          <p className="text-md text-start">
            We envision being the hub of quality, globally-competitive and socially-responsive information technology
            education
          </p>
        </div>
        <Separator orientation="vertical" className="h-auto mx-2" />
        <div className="flex flex-col gap-2 p-4 w-[400px]">
          <h1 className="text-4xl font-bold">VISION</h1>
          <p className="text-md text-start">
            <span className="font-bold text-start">We commit to continuously:</span>
            <br />
            <br />
            Offer relevant programs that mold well-rounded computing professionals;
            <br />
            <br />
            Engage in accreditation and quality standards;
            <br />
            <br />
            and Facilitate in building an IT-enabled nation.
          </p>
        </div>
        <Separator orientation="vertical" className="h-auto mx-2" />
        <div className="flex flex-col gap-2 p-4 w-[400px]">
          <span className="text-4xl font-bold">GOALS</span>
          <p className="text-start text-md">
            <span className="font-bold">We aim to cultivate a teaching-learning environment that:</span>
            <br />
            <br />
            Promotes scholarly endeavors for the promotion of moral, social, cultural, and environmental interests;
            <br />
            <br />
            Meets the demands of the industry in terms of technical, personal and interpersonal skills;
            <br />
            <br />
            Conducts intellectual, technological and significant researches in computing; and
            <br />
            <br />
            Optimizes the use of appropriate and advanced resources and services.
          </p>
        </div>
        <Separator orientation="vertical" className="h-auto mx-2" />
        <div className="flex flex-col gap-2 p-4 w-[400px]">
          <span className="text-4xl font-bold">CORE VALUES</span>
          <p className="text-md text-start">
            <span className="font-bold">These are the core values that CCS believes in:</span>
            <br />
            <br />
            <span className="font-bold">Initiative (inceptum)</span>
            wit, practicality, ingenuity
            <br />
            <br />
            <span className="font-bold">Innovation (innovatio)</span>
            technology, creativity, novelty
            <br />
            <br />
            <span className="font-bold">Service (muneris)</span>
            industry, loyalty, courtesy
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
