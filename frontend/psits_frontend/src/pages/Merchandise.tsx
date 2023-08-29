import { ShoppingBag } from "lucide-react";

import Wrapper from "@/components/Wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/components/Context";

const dummyData = [
  {
    id: 1,
    title: "Tiger",
    createdBy: 1234,
    information: "Cool T-shirt",
    price: 100,
    discount: 10,
    stock: 20,
    photo_img_link: "",
    size: "Large",
    color: "Black",
    rating: 20,
    quantity: 1,
    showPublic: true,
  },
  {
    id: 2,
    title: "Slant Hoodie",
    createdBy: 1234,
    information: "Cool T-shirt",
    price: 750,
    discount: 150,
    stock: 20,
    photo_img_link: "",
    size: "Large",
    color: "Black",
    rating: 20,
    quantity: 1,
    showPublic: true,
  },
  {
    id: 3,
    title: "Slant Hoodie",
    createdBy: 1234,
    information: "Cool T-shirt",
    price: 50,
    discount: 0,
    stock: 20,
    photo_img_link: "",
    size: "Large",
    color: "Black",
    rating: 20,
    quantity: 1,
    showPublic: true,
  },
  {
    id: 4,
    title: "Slant Hoodie",
    createdBy: 1234,
    information: "Cool T-shirt",
    price: 400,
    discount: 50,
    stock: 20,
    photo_img_link: "",
    size: "Large",
    color: "Black",
    rating: 20,
    quantity: 1,
    showPublic: true,
  },
  {
    id: 5,
    title: "Slant Hoodie",
    createdBy: 1234,
    information: "Cool T-shirt",
    price: 300,
    discount: 15,
    stock: 20,
    photo_img_link: "",
    size: "Large",
    color: "Black",
    rating: 20,
    quantity: 1,
    showPublic: true,
  },
  {
    id: 6,
    title: "Slant Hoodie",
    createdBy: 1234,
    information: "Cool T-shirt",
    price: 150,
    discount: 5,
    stock: 20,
    photo_img_link: "",
    size: "Large",
    color: "Black",
    rating: 20,
    quantity: 1,
    showPublic: true,
  },
];

const Merchandise = () => {
  const { addToCart } = useShoppingCart();

  return (
    <Wrapper title="PSITS | Merchandise">
      <div className="min-h-screen my-20">
        <h1 className="text-7xl text-center font-bold text-[#1A1A1A] mb-20">Merchandise</h1>
        <div className="flex flex-row flex-wrap justify-center">
          {dummyData.map((item) => (
            <Card key={item.id} className="w-[350px] border-0 shadow-none">
              <CardHeader className="relative">
                <div className="w-full h-[400px] bg-gray-200 rounded-lg shadow-lg"></div>
                <Button
                  className="bg-[#000] bg-opacity-100 hover:bg-[#000] hover:bg-opacity-75 py-[7.5%] absolute bottom-8 end-8 rounded-full"
                  onClick={() => addToCart(item)}
                >
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
