import { Plus, ShoppingBag, Trash } from "lucide-react";
import { z } from "zod";

import Wrapper from "@/components/Wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createMerchandiseItem, deleteMerchandiseItem, getMerchandise } from "@/api/merchandise";
import useShoppingCart from "@/store/useShoppingCart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    photo_img_links: z.any(),
    size: z.string(),
    color: z.string(),
    rating: z.number(),
    quantity: z.number(),
    showPublic: z.boolean()
  })

export type MerchandiseSchema = z.infer<typeof MerchandiseSchema>;

const Merchandise = () => {
  const { addToCart } = useShoppingCart();
  const queryClient = useQueryClient();

  const {
    data: merch,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["merch"],
    queryFn: getMerchandise
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MerchandiseSchema>({
    resolver: zodResolver(MerchandiseSchema)
  })

  const { mutate: deleteMutate, reset: deleteReset } = useMutation({
    mutationFn: deleteMerchandiseItem,
    onSuccess: (merch) => {
      queryClient.invalidateQueries(["merch"]);
      toast.success(`${merch.message}`);
      deleteReset();
    },
    onError(error: any) {
      toast.error(error.response.merch.message || error.message)
    }
  })

  const { mutate: createMutate, reset: createReset } = useMutation({
    mutationFn: createMerchandiseItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["merch"]);
      toast.success(`${data.message}`);
      createReset()
    },
    onError(error: any) {
      toast.error(error.response.merch.message || error.message)
    }
  })

  const onSubmit: SubmitHandler<MerchandiseSchema> = (data) => {
    createMutate(data);
  }
  
  return (
    <Wrapper title="PSITS | Merchandise">
      <div className="min-h-screen my-20">
        <h1 className="text-7xl text-center font-bold text-[#1A1A1A] mb-20">Merchandise</h1>
        <div className="flex flex-row flex-wrap justify-center">
          <Card className="w-[350px] border-0 shadow-none">
            <CardHeader>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="max-h-[400px] h-[400px] bg-transparent hover:bg-transparent border-2 text-black rounded-lg"
                  >
                    <Plus size={40} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[40%] h-[80%] bg-white">
                  <ScrollArea>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col mt-10 gap-y-10 items-center mx-5">
                        <div className="bg-gray-200 h-[300px] w-[50%] rounded-lg border-2 border-black relative col-span-2">
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
                            {...register("photo_img_links")}
                          />
                          {/* {errors.photo_img_links && <p className="text-red-400 text-sm font-light">{errors.photo_img_links.message}</p>} */}
                        </div>
                        <div className="flex flex-row gap-x-5">
                          <div className="flex flex-col gap-y-3">
                            <Label className="text-gray-500">Item Name</Label>
                            <Input
                              autoComplete="off"
                              id="itemName"
                              placeholder="Enter item name"
                              className="w-full"
                              {...register("title")}
                            />
                            {errors.title && <p className="text-red-400 text-sm font-light">{errors.title.message}</p>}
                          </div>
                          <div className="flex flex-col gap-y-3">
                            <Label className="text-gray-500">Item Price</Label>
                            <Input
                              autoComplete="off"
                              id="itemPrice"
                              placeholder="Enter item price"
                              type="number"
                              {...register("price")}
                            />
                            {errors.price && <p className="text-red-400 text-sm font-light">{errors.price.message}</p>}
                          </div>
                        </div>
                        <div className="flex flex-row gap-x-5">
                          <div className="flex flex-col gap-y-3">
                            <Label className="text-gray-500">Item Discount in %</Label>
                            <Input
                              autoComplete="off"
                              id="itemDiscount"
                              placeholder="Enter discount"
                              {...register("discount")}
                            />
                          </div>
                          <div className="flex flex-col gap-y-3">
                            <Label className="text-gray-500">Item Color</Label>
                            <Input
                              autoComplete="off"
                              id="email"
                              placeholder="Enter item color"
                              {...register("color")}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-x-5">
                          <div className="flex flex-col gap-y-3">
                            <Label className="text-gray-500">Item Description</Label>
                            <Textarea
                              className="w-full"
                              {...register("information")}
                              {...errors.information && <p className="text-red-400 text-sm font-light">{errors.information.message}</p>}
                            />
                          </div>
                          <div className="flex flex-col">
                            <Button type="submit">Post</Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <span className="text-lg font-semibold">New</span>
              </div>
            </CardContent>
          </Card>
          {merch?.merchandise?.map((item: any) => (
            <Card key={item._id} className="w-[350px] border-0 shadow-none">
              <CardHeader className="relative">
                <img src={item.photo_img_links[0]} alt="Merch Item" className="w-full h-[400px] rounded-lg border-2 border-black" />
                <Button
                  className="bg-[#000] bg-opacity-100 hover:bg-[#353535] py-[7.5%] absolute bottom-8 end-8 rounded-full"
                  onClick={() => addToCart(item)}
                >
                  <ShoppingBag size={20} />
                </Button>
                <Button
                  className="bg-red-600 bg-opacity-100 hover:bg-red-500 py-[7.5%] absolute top-7 end-8 rounded-full"
                  onClick={() => deleteMutate(item._id)}
                >
                  <Trash size={20} />
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
