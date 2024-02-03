import { toast } from "react-toastify";
import { ShoppingBag } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import useStore from "@/store";
import { addToCart } from "@/api/cart";

interface MerchandiseCardProps {
  item: {
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
  };
}

const MerchandiseCard = ({ item }: MerchandiseCardProps) => {
  const queryClient = useQueryClient();
  const store = useStore();

  const { mutate: createMutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: (cart) => {
      queryClient.invalidateQueries(["cart"]);
      toast.success(`${cart.msg}`, { position: "bottom-right" });
    },
    onError(error: any) {
      toast.error(error.response.cart.message || error.message, { position: "bottom-right" });
    },
  });

  const handleAddToCart = () => {
    const userId = store?.authUser?._id || "";

    const size = item.size.split(",");
    const color = item.color.split(",");
    const data = {
      merchId: item._id,
      price: item.price,
      quantity: 1,
      size: size[0],
      color: color[0],
      image: item.images[0].image,
      name: item.name,
      stocks: item.stocks,
    };

    if(item.stocks > 0) createMutate({ userId, data });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      style={item.stocks <= 0 ? { opacity: 0.5, pointerEvents: "none" } : {}}
    >
      <Card className="w-[350px]">
        <div className="relative">
          {item?.images.length > 1 ? (
            <Slide indicators>
              {item?.images.map((slideImage) => (
                <div
                  key={slideImage.imagePublicId}
                  className="flex items-center justify-center rounded-t h-[350px] bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${slideImage.image})` }}
                />
              ))}
            </Slide>
          ) : (
            <Link to={`/merchandise/${item._id}`}>
              <img src={item.images[0].image} alt="Product Image" className="rounded-t h-[400px] object-cover" />
            </Link>
          )}
        </div>
        <CardContent className="mt-4">
          <div className="flex flex-col gap-2">
            <Link to={`${item._id}`}>
              <h1 className="text-lg font-semibold">{item.name}</h1>
            </Link>
            <p className="text-slate-600 mb-4 font-light">₱{item.price}.00</p>
            {store.authUser && (
              <Button className="gap-2 py-6" onClick={handleAddToCart}>
                <ShoppingBag size={20} />
                Add to cart
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MerchandiseCard;
