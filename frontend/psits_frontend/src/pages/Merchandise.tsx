import { SlidersHorizontal } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";
import Wrapper from "@/components/Wrapper";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const dummyData = [
  {
    id: 1234,
    title: "Tiger",
    createdBy: 1234,
    information: "Cool T-shirt",
    price: 200,
    discount: 200,
    stock: 20,
    photo_img_link: "",
    size: "Large",
    rating: 20,
    showPublic: true,
  },
  {
    id: 12345,
    title: "Slant Hoodie",
    createdBy: 1234,
    information: "Cool T-shirt",
    price: 750,
    discount: 200,
    stock: 20,
    photo_img_link: "",
    size: "Large",
    rating: 20,
    showPublic: true,
  },
];

const Merchandise = () => {
  return (
    <Wrapper title="PSITS | Merchandise">
      <div className="min-h-screen">
        <h1 className="text-7xl text-center font-bold text-[#1A1A1A] my-20">Merchandise</h1>
        <div className="flex gap-10">
          <div className="flex flex-col text-start w-[300px] gap-4 text-[#1A1A1A] font-semibold">
            <div className="flex items-center gap-4">
              <SlidersHorizontal />
              <p>Filters</p>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <Label htmlFor="in-stock">In stock only</Label>
              <Switch id="in-stock" />
            </div>
            <Separator className="my-2" />
            <div>
              <Label>Price</Label>
            </div>
          </div>
          {dummyData.map((data) => {
            return (
              <Card key={data.id} className="w-[350px] cursor-pointer">
                <CardHeader>
                  <div className="w-full h-[400px] bg-slate-300 rounded" />
                </CardHeader>
                <CardContent className="">
                  <h1 className="text-lg font-semibold">{data.title}</h1>
                  <p className="text-lg font-light">₱{data.price}.00</p>
                </CardContent>
                <CardFooter>
                  <h1>Variants</h1>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default Merchandise;
