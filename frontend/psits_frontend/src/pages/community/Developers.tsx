import Wrapper from "@/components/Wrapper";
import { Card } from "@/components/ui/card";
import { psitsWebDevelopers } from "@/constants";
import { motion } from "framer-motion";

const Developers = () => {
  return (
    <Wrapper title="PSTIS | Officers" className="my-20">
      <h1 className="text-4xl font-bold mb-10 text-[#074873]">Developers</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {psitsWebDevelopers.map((dev: any) => {
          return (
            <motion.div
              key={dev.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="w-[300px] h-[430px] text-center shadow -z-30">
                <div className="w-full bg-[#074873] p-2 rounded-t">
                  <span className="uppercase text-white font-semibold">{dev.position}</span>
                </div>
                <div className="p-2 flex flex-col gap-4">
                  <div className="border-2 rounded h-[300px]">
                    <img src={dev.image} className="h-full w-full object-cover" />
                    <img src={dev.gif} className="relative -top-[500px] -z-10 h-[300px]" />
                  </div>
                  <h1 className="text-xl font-semibold">{dev.name}</h1>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Developers;
