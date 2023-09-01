import { ShoppingBag } from "lucide-react";
import { z } from "zod";

import Wrapper from "@/components/Wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMerchandise } from "@/api/merchandise";
import useShoppingCart from "@/store/useShoppingCart";
import { useQuery } from "@tanstack/react-query";

interface Merchandise {
  _id: string,
  title: string,
  information: string,
  price: number,
  discount: number,
  stock: number,
  photo_img_links: [],
  size: string,
  color: string,
  styles: [],
  rating: number,
  showPublic: boolean
}

const MerchandiseSchema = z
  .object({
    _id: z.string(),
    title: z.string(),
    information: z.string(),
    price: z.number(),
    discount: z.number(),
    stock: z.number(),
    photo_img_links: z.string(),
    size: z.string(),
    color: z.string(),
    rating: z.number(),
    quantity: z.number(),
    showPublic: z.boolean()
  })

export type MerchandiseSchema = z.infer<typeof MerchandiseSchema>;

const Merchandise = () => {
  const { addToCart } = useShoppingCart()
  const { data } = useQuery({
    queryKey: ["merch"],
    queryFn: getMerchandise
  })

  return (
    <Wrapper title="PSITS | Merchandise">
      <div className="min-h-screen my-20">
        <h1 className="text-7xl text-center font-bold text-[#1A1A1A] mb-20">Merchandise</h1>
        <div className="flex flex-row flex-wrap justify-center">
          {data?.merchandise?.map((item: any) => (
            <Card key={item._id} className="w-[350px] border-0 shadow-none">
              <CardHeader className="relative">
                <img src={item.photo_img_links[0]} alt="Merch Item" className="w-full h-[400px] rounded-lg shadow-lg" />
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
  )
}

export default Merchandise;
