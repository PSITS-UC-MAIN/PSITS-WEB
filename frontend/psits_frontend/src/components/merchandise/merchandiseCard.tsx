import { Card, CardContent, CardHeader } from "../ui/card";
import { FileEdit, Plus, ShoppingBag, Trash } from "lucide-react";
import { deleteMerchandiseItem, updateMerchandiseItem } from "@/api/merchandise";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShoppingCart from "@/store/useShoppingCart";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store";
import { useState } from "react";

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
        image: string,
        imagePublicId: string
      }
    ];
    size: string;
    color: string;
  };
}

const MerchandiseSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discount: z.number(),
  images: z.any(),
  size: z.string(),
  color: z.string(),
});

type MerchandiseSchema = z.infer<typeof MerchandiseSchema>;

const MerchandiseCard = ({ item }: MerchandiseCardProps) => {
  const { addToCart } = useShoppingCart();
  const queryClient = useQueryClient();
  const store = useStore();
  const [file, setFile] = useState("");

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MerchandiseSchema>({
    resolver: zodResolver(MerchandiseSchema),
  });

  const { mutate: updateMutate, reset: updateReset } = useMutation({
    mutationFn: updateMerchandiseItem,
    onSuccess: (merch) => {
      queryClient.invalidateQueries(["merch"]);
      toast.success(`${merch.message}`);
      updateReset();
    },
    onError(error: any) {
      toast.error(error.response.merch.message || error.message);
    },
  });

  const onSubmit: SubmitHandler<MerchandiseSchema> = (data: any) => {
    const merchandiseItemId = item._id;
    updateMutate({ merchandiseItemId, data });
  };

  return (
    <Card className="w-[350px] border-0 shadow-none">
      <CardHeader className="relative">
        <img
          src={item.images[0].image}
          alt="Merch Item"
          className="w-full h-[400px] rounded-lg border-2 border-black"
        />
        {store.authUser?.isAdmin && (
          <>
            <Button
              className="bg-red-600 hover:bg-red-500 py-[7.5%] absolute top-[0%] end-[0%] rounded-full"
              onClick={() => deleteMutate(item._id)}
            >
              <Trash size={20} />
            </Button>
            <Dialog>
              <DialogHeader>
                <DialogTrigger asChild>
                  <Button className="bg-[#268EA7] hover:bg-[#3da7c2] py-[7.5%] absolute bottom-[23%] end-[11%] rounded-full">
                    <FileEdit size={20} />
                  </Button>
                </DialogTrigger>
              </DialogHeader>
              <DialogContent className="h-[85%] bg-white mx-10">
                <ScrollArea>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mt-10 gap-y-10 items-center mx-5">
                      <div className="max-h-[300px] max-w-[50%] border-black relative col-span-2">
                        <img src={file !== '' ? file : item.images[0].image} alt="" className="h-[300px] shadow-lg rounded-lg" />
                        <Label htmlFor="img">
                          <Plus
                            className="bg-[#000] bg-opacity-100 hover:bg-[#353535] w-[40px] h-[40px] rounded-full absolute bottom-3 end-3 p-2"
                            color="#fff"
                            size={40}
                          />
                        </Label>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="img"
                          {...register("images", {
                            onChange: (event) => {
                              const fileURL = URL.createObjectURL(event.target.files[0]);
                              setFile(() => fileURL);
                            },
                          })}
                        />
                      </div>
                      <div className="flex flex-row gap-x-5">
                        <div className="flex flex-col gap-y-3">
                          <Label className="text-gray-500" htmlFor="itemName">
                            Item Name
                          </Label>
                          <Input
                            autoComplete="off"
                            id="itemName"
                            placeholder="Enter item name"
                            className="w-full"
                            defaultValue={item.name}
                            {...register("name")}
                          />
                          {errors.name && (
                            <p className="text-red-400 text-sm font-light">{errors.name.message}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-y-3">
                          <Label className="text-gray-500" htmlFor="itemPrice">
                            Item Price
                          </Label>
                          <Input
                            autoComplete="off"
                            id="itemPrice"
                            placeholder="Enter item price"
                            type="number"
                            defaultValue={item.price}
                            {...register("price", { valueAsNumber: true })}
                          />
                          {errors.price && <p className="text-red-400 text-sm font-light">{errors.price.message}</p>}
                        </div>
                      </div>
                      <div className="flex flex-row gap-x-5">
                        <div className="flex flex-col gap-y-3">
                          <Label className="text-gray-500" htmlFor="itemDiscount">
                            Item Discount in %
                          </Label>
                          <Input
                            autoComplete="off"
                            id="itemDiscount"
                            placeholder="Enter discount"
                            type="number"
                            defaultValue={item.discount}
                            {...register("discount", { valueAsNumber: true })}
                          />
                          {errors.discount && (
                            <p className="text-red-400 text-sm font-light">{errors.discount.message}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-y-3">
                          <Label className="text-gray-500" htmlFor="itemColor">
                            Item Color
                          </Label>
                          <Input
                            autoComplete="off"
                            id="itemColor"
                            placeholder="Enter item color"
                            defaultValue={item.color}
                            {...register("color")}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-x-5">
                        <div className="flex flex-col gap-y-3">
                          <Label className="text-gray-500" htmlFor="itemDesc">
                            Item Description
                          </Label>
                          <Textarea
                            className="w-full"
                            id="itemDesc"
                            defaultValue={item.description}
                            {...register("description")}
                          />
                          {errors.description && (
                            <p className="text-red-400 text-sm font-light">{errors.description.message}</p>
                          )}
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Update
                      </Button>
                    </div>
                  </form>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </>
        )}
        {store.authUser != null && (
          <Button
            className="bg-black hover:bg-[#303030] py-[7.5%] absolute bottom-[9%] end-[11%] rounded-full"
            onClick={() => addToCart(item)}
          >
            <ShoppingBag size={20} />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-semibold">{item.name}</h1>
          <p className="text-lg font-light">₱{item.price}.00</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MerchandiseCard;
