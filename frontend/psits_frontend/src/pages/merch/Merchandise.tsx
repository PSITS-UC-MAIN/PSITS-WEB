import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

import Wrapper from "@/components/Wrapper";
import { getAllMerchandise } from "@/api/merchandise";
import MerchandiseCard from "@/components/merchandise/MerchandiseCard";
import MerchandiseFilter from "@/components/merchandise/MerchandiseFilter";

interface Merchandise {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stocks: number;
  images: [
    {
      image: string;
      imagePublicId: string;
    },
  ];
  size: string;
  color: string;
  ratings: number;
}

const MerchandiseSchema = z.object({
  name: z.string().nonempty("This field is required."),
  description: z.string().nonempty("This field is required."),
  price: z.number(),
  discount: z.number(),
  images: z.any(),
  color: z.string(),
  size: z.string(),
  stocks: z.number(),
});

export type MerchandiseSchema = z.infer<typeof MerchandiseSchema>;

const Merchandise = () => {
  const { data: merch } = useQuery({
    queryKey: ["merch"],
    queryFn: getAllMerchandise,
  });

  return (
    <Wrapper title="PSITS | Merchandise" className="min-h-screen my-20">
      <h1 className="text-4xl font-bold text-[#074873] mb-10">Merchandise</h1>
      <div className="flex gap-10">
        <MerchandiseFilter />
        <div className="flex flex-wrap justify-evenly mt-14 gap-6">
          {merch?.merchandise?.map((item: any) => <MerchandiseCard key={item._id.toString()} item={item} />)}
        </div>
      </div>
    </Wrapper>
  );
};

export default Merchandise;
