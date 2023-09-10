import { Slide } from "react-slideshow-image";
import { motion } from "framer-motion";

import Wrapper from "@/components/Wrapper";
import { aboutUsUCTransparent, ccsLogo } from "@/assets";
import { aboutUsBannerImages, aboutUsHighlights } from "@/constants";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <Wrapper noMargin title="PSITS | About Us" className="mt-10">
      <div className="sm:mx-[150px] rounded mb-20">
        <Slide indicators>
          {aboutUsBannerImages.map((slideImage) => (
            <div
              key={slideImage.name}
              className="flex items-center justify-center rounded h-[250px] sm:h-[700px] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${slideImage.banner})` }}
            />
          ))}
        </Slide>
      </div>
      <div className="bg-[#ddd75b] w-full h-[10px]" />
      <div className="flex flex-row flex-wrap items-center justify-center bg-[#074873] text-white py-10 gap-x-10 mb-20">
        <div className="flex flex-col mx-5">
          <h1 className="sm:text-4xl font-bold mb-6 text-center">About Us</h1>
          <p className="flex flex-col items-center text-sm sm:text-lg">
            <span>PSITS - University of Cebu-Main Campus Chapter</span>
            <span>the Official School Organization for College of Computer Studies</span>
            <br />
            <span>BSIT Students</span>
          </p>
        </div>
        <img src="./logo/psits_logo.png" alt="PSITS Logo" className="mt-10" />
      </div>
      <div className="mb-20 sm:mx-[150px] text-center overflow-hidden">
        <motion.div
          className="flex gap-10 items-center"
          animate={{ x: -2530 }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="flex justify-start gap-4">
            {aboutUsHighlights.map((highlight) => (
              <Card className="w-[300px] p-2 bg-[#ece473]" key={Math.random()}>
                <img src={highlight.image} className="h-[400px] object-cover" />
              </Card>
            ))}
            {aboutUsHighlights.map((highlight) => (
              <Card className="w-[300px] p-2 bg-[#ece473]" key={Math.random()}>
                <img src={highlight.image} className="h-[400px] object-cover" />
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
      {/* UC MVG starts here */}
      <div className="flex flex-row flex-wrap bg-[#f5e5cf] py-20 items-center gap-x-10 gap-y-10 justify-center mb-20">
        <div className="flex flex-col items-center sm:items-start gap-4 w-[400px] mx-10">
          <span className="text-5xl font-bold text-[#074873]">MISSION</span>
          <p className="word-break text-lg text-center sm:text-start">
            The University offers affordable and quality education responsive to the demands of local and international
            communities.
          </p>
        </div>
        <div className="rounded-full bg-white w-[300px] h-[300px] p-6 shadow-lg border border-slate-400 flex justify-center items-center mx-10">
          <img src={aboutUsUCTransparent} alt="UC Logo" className="object-contain" />
        </div>
        <div className="flex flex-col items-center sm:items-start gap-4 w-[400px] mx-10">
          <span className="text-5xl font-bold text-[#074873]">VISION</span>
          <p className="word-break text-lg text-center sm:text-start">
            Democratize quality education. Be the visionary and industry leader. Give hope and transform lives.
          </p>
        </div>
      </div>
      {/* CCS MVG starts here */}
      <div className=" justify-center flex mb-5">
        <img src={ccsLogo} alt="CCS Logo" />
      </div>
      <div className="flex flex-row flex-wrap justify-center text-start gap-4 mb-20">
        <div className="flex flex-col h-[250px] gap-2 p-4 w-[300px] items-center">
          <h1 className="text-4xl font-bold text-[#074873]">MISSION</h1>
          <p className="text-md text-center sm:text-start">
            We envision being the hub of quality, globally-competitive and socially-responsive information technology
            education
          </p>
        </div>
        <Separator orientation="vertical" className="h-auto mx-2 hidden sm:block" />
        <div className="flex flex-col gap-2 p-4 w-[300px] items-center mb-10">
          <h1 className="text-4xl font-bold text-[#074873]">VISION</h1>
          <p className="text-md text-center sm:text-start">
            <span className="font-semibold text-start">We commit to continuously:</span>
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
        <Separator orientation="vertical" className="h-auto mx-2 hidden sm:block" />
        <div className="flex flex-col gap-2 p-4 w-[300px] items-center mb-10">
          <span className="text-4xl font-bold text-[#074873]">GOALS</span>
          <p className="text-md text-center sm:text-start">
            <span className="font-semibold">We aim to cultivate a teaching-learning environment that:</span>
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
        <Separator orientation="vertical" className="h-auto mx-2 hidden sm:block" />
        <div className="flex flex-col gap-2 p-4 w-[300px] items-center">
          <span className="text-4xl font-bold text-[#074873]">CORE VALUES</span>
          <p className="text-md text-center sm:text-start">
            <span className="font-semibold">These are the core values that CCS believes in:</span>
            <br />
            <br />
            <span className="font-semibold">Initiative (inceptum)</span>
            wit, practicality, ingenuity
            <br />
            <br />
            <span className="font-semibold">Innovation (innovatio)</span>
            technology, creativity, novelty
            <br />
            <br />
            <span className="font-semibold">Service (muneris)</span>
            industry, loyalty, courtesy
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
