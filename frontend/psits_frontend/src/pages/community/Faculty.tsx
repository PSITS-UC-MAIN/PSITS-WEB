import Wrapper from "@/components/Wrapper";
import { Card } from "@/components/ui/card";
import { ccsFaculty } from "@/constants";
import { motion } from "framer-motion";

const Faculty = () => {
  return (
    <Wrapper title="PSTIS | Faculty" className="my-20">
      <h1 className="text-4xl font-bold mb-10 text-[#074873]">Faculty Members</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {ccsFaculty.map((mentor) => {
          return (
            <motion.div
              key={mentor.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="w-[300px] max-h-[420px] text-center shadow">
                <div className="p-2">
                  <div className="border-2 rounded h-[300px] bg-slate-200">
                    {/* <img src={mentor.image} className="h-full w-ful object-cover" /> */}
                  </div>
                </div>
                <div className="w-full bg-[#a134d8] p-1">
                  <span className="uppercase text-white font-semibold">{mentor.position}</span>
                </div>
                <div className="w-full h-[5px] bg-[#f8c65b]" />
                <h1 className="text-xl my-4 text-[#252525] font-semibold">{mentor.name}</h1>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Faculty;
