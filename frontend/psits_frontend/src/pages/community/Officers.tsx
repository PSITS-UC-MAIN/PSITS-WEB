import Wrapper from "@/components/Wrapper";
import { Card } from "@/components/ui/card";
import { psitsOfficers } from "@/constants";
import { motion } from "framer-motion";

const Officers = () => {
  return (
    <Wrapper title="PSTIS | Officers" className="my-20">
      <h1 className="text-4xl font-bold mb-10 text-[#074873]">PSITS Officers</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {psitsOfficers.map((officer) => {
          return (
            <motion.div
              key={officer.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="w-[300px] h-[430px] text-center shadow">
                <div className="w-full bg-[#074873] p-2 rounded-t">
                  <span className="uppercase text-white font-semibold">{officer.position}</span>
                </div>
                <div className="p-2 flex flex-col gap-4">
                  <div className="border-2 rounded h-[300px]">
                    <img src={officer.image} className="h-full w-full object-cover" />
                  </div>
                  <h1 className="text-xl font-semibold">{officer.name}</h1>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Officers;
