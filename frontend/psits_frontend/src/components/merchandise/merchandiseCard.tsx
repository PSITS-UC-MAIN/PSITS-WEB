import { Card, CardContent, CardHeader } from "../ui/card";
import { FileEdit, ShoppingBag, Trash } from "lucide-react";
import { deleteMerchandiseItem } from "@/api/merchandise";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShoppingCart from "@/store/useShoppingCart";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

interface MerchandiseCardProps {
  item: {
    _id: string;
    title: string;
    information: string;
    price: number;
    discount: number;
    stock: number;
    photo_img_links: string;
    size: string;
    color: string;
    styles: [];
    rating: number;
    quantity: number;
    showPublic: boolean;
  };
}

const MerchandiseCard = ({ item }: MerchandiseCardProps) => {
  const { addToCart } = useShoppingCart();
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, reset: deleteReset } = useMutation({
    mutationFn: deleteMerchandiseItem,
    onSuccess: (merch) => {
      queryClient.invalidateQueries(["merch"]);
      toast.success(`${merch.message}`);
      deleteReset();
    },
    onError(error: any) {
      toast.error(error.response.merch.message || error.message);
    },
  });

  return (
    <Card className="w-[350px] border-0 shadow-none">
      <CardHeader className="relative">
        <img
          src={item.photo_img_links[0]}
          alt="Merch Item"
          className="w-full h-[400px] rounded-lg border-2 border-black"
        />
        <Button
          className="opacity-25 hover:opacity-100 bg-red-600 hover:bg-red-600 py-[7.5%] absolute top-[7%] end-[11%] rounded-full"
          onClick={() => deleteMutate(item._id)}
        >
          <Trash size={20} />
        </Button>
        <Button
          className="opacity-25 hover:opacity-100 bg-[#268EA7] hover:bg-[#3da7c2] py-[7.5%] absolute top-[20%] end-[11%] rounded-full"
          // onClick={() => deleteMutate(item._id)}
        >
          <FileEdit size={20} />
        </Button>
        <Button
          className="opacity-25 hover:opacity-100 bg-black hover:bg-black py-[7.5%] absolute bottom-[9%] end-[11%] rounded-full"
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
  );
};

export default MerchandiseCard;
