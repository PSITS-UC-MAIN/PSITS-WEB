import { ShoppingBag } from "lucide-react";

import Wrapper from "@/components/Wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dummyData = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
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
  {
    id: 4,
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
  {
    id: 5,
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
  {
    id: 6,
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
      <div className="min-h-screen my-20">
        <h1 className="text-7xl text-center font-bold text-[#1A1A1A] mb-20">Merchandise</h1>
        <div className="flex flex-row flex-wrap justify-center">
          {dummyData.map((item) => (
            <Card key={item.id} className="w-[350px] border-0">
              <CardHeader className="relative">
                <div className="w-full h-[400px] bg-slate-300 rounded-lg" />
                <Button className="bg-[#000] bg-opacity-100 hover:bg-[#000] hover:bg-opacity-75 py-[7.5%] absolute bottom-8 end-8 rounded-full">
                  <ShoppingBag size={20} />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row justify-between">
                  <h1 className="text-lg font-semibold">{item.title}</h1>
                  <p className="text-lg font-light">₱{item.price}.00</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Merchandise;
