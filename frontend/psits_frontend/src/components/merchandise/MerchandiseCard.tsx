import { toast } from "react-toastify";
import { FileEdit, Loader2, Plus, ShoppingBag, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { motion } from "framer-motion";

import { deleteMerchandiseItem, updateMerchandiseItem } from "@/api/merchandise";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useStore from "@/store";
import { useState } from "react";
import { addToCart } from "@/api/cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

type MerchandiseSchema = z.infer<typeof MerchandiseSchema>;

const MerchandiseCard = ({ item }: MerchandiseCardProps) => {
  const queryClient = useQueryClient();
  const store = useStore();
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);

  const {
    mutate: deleteMutate,
    reset: deleteReset,
    isLoading: deleteIsLoading,
  } = useMutation({
    mutationFn: deleteMerchandiseItem,
    onSuccess: (merch) => {
      queryClient.invalidateQueries(["merch"]);
      toast.success(`${merch.message}`, { position: "bottom-right" });
      deleteReset();
    },
    onError(error: any) {
      toast.error(error.response.merch.message || error.message, { position: "bottom-right" });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MerchandiseSchema>({
    resolver: zodResolver(MerchandiseSchema),
    defaultValues: {
      name: item.name,
      price: item.price,
      discount: item.discount,
      color: item.color,
      description: item.description,
      stocks: item.stocks,
    },
  });

  const {
    mutate: updateMutate,
    reset: updateReset,
    isLoading: updateIsLoading,
  } = useMutation({
    mutationFn: updateMerchandiseItem,
    onSuccess: (merch) => {
      queryClient.invalidateQueries(["merch"]);
      toast.success(`${merch.message}`, { position: "bottom-right" });
      updateReset();
      setOpen(false);
    },
    onError(error: any) {
      toast.error(error.response.merch.message || error.message, { position: "bottom-right" });
    },
  });

  const onSubmit: SubmitHandler<MerchandiseSchema> = (data: any) => {
    const formData = new FormData();
    const merchandiseItemId = item._id;

    if (data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images[]", data.images[i]);

        if (item.images[i]) {
          formData.append("image[]", item.images[i].image);
          formData.append("imagePublicId[]", item.images[i].imagePublicId);
        }
      }
      formData.append("merch", JSON.stringify(data));
      data = formData;
      updateMutate({ merchandiseItemId, data });
    } else {
      for (let i = 0; i < item.images.length; i++) {
        if (item.images[i]) {
          formData.append("image[]", item.images[i].image);
          formData.append("imagePublicId[]", item.images[i].imagePublicId);
        }
      }
      formData.append("merch", JSON.stringify(data));
      data = formData;
      updateMutate({ merchandiseItemId, data });
    }
  };

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

    createMutate({ userId, data });
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Card className="w-[350px]">
        <div className="relative">
          {item?.images.length > 1 ? (
            <Slide indicators>
              {item?.images.map((slideImage) => (
                <div
                  key={slideImage.imagePublicId}
                  className="flex items-center justify-center rounded-t h-[400px] bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${slideImage.image})` }}
                />
              ))}
            </Slide>
          ) : (
            <Link to={`/merchandise/${item._id}`}>
              <img src={item.images[0].image} alt="Product Image" className="rounded-t h-[400px] object-cover" />
            </Link>
          )}
          {store.authUser?.isAdmin && (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="bg-red-600 hover:bg-red-500 py-[7.5%] absolute top-[0%] end-[0%] rounded-full"
                    disabled={deleteIsLoading}
                  >
                    <Trash size={20} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the annoucement and remove the data
                      from the server.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteMutate(item._id)} className="bg-[#074873] hover:bg-[#2d7db3]">
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogHeader>
                  <DialogTrigger asChild>
                    <Button className="bg-[#268EA7] hover:bg-[#3da7c2] py-[7.5%] absolute top-[15%] end-[0%] rounded-full">
                      <FileEdit size={20} />
                    </Button>
                  </DialogTrigger>
                </DialogHeader>
                <DialogContent className="h-[85%] w-[1000px] bg-white mx-10">
                  <ScrollArea>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                      <div className="flex flex-col mt-10 gap-y-10 items-center mx-5">
                        <div className="max-h-[300px] max-w-[50%] border-black relative col-span-2">
                          <img
                            src={file !== "" ? file : item.images[0].image}
                            alt=""
                            className="h-[300px] shadow-lg rounded-lg"
                          />
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
                            multiple
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
                            {errors.name && <p className="text-red-400 text-sm font-light">{errors.name.message}</p>}
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
                            <Label className="text-gray-500" htmlFor="itemSize">
                              Item Size
                            </Label>
                            <Input
                              autoComplete="off"
                              id="itemSize"
                              placeholder="Enter item size"
                              defaultValue={item.size}
                              {...register("size")}
                            />
                            {errors.size && <p className="text-red-400 text-sm font-light">{errors.size.message}</p>}
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
                            {errors.color && <p className="text-red-400 text-sm font-light">{errors.color.message}</p>}
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-x-5">
                          <div className="flex flex-col gap-y-3">
                            <Label className="text-gray-500" htmlFor="itemStock">
                              Stock
                            </Label>
                            <Input
                              autoComplete="off"
                              id="itemStock"
                              placeholder="Enter stock"
                              type="number"
                              defaultValue={item.stocks}
                              {...register("stocks", { valueAsNumber: true })}
                            />
                            {errors.stocks && (
                              <p className="text-red-400 text-sm font-light">{errors.stocks.message}</p>
                            )}
                          </div>
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
                        <Button type="submit" className="w-full" disabled={updateIsLoading}>
                          {updateIsLoading ? <Loader2 className=" animate-spin" /> : "Update"}
                        </Button>
                      </div>
                    </form>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </>
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
