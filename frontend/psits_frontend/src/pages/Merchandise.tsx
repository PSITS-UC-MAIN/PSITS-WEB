import { Plus } from "lucide-react";
import { z } from "zod";

import Wrapper from "@/components/Wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createMerchandiseItem, getMerchandise } from "@/api/merchandise";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MerchandiseCard from "@/components/merchandise/merchandiseCard";

interface Merchandise {
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
}

const MerchandiseSchema = z.object({
  title: z.string(),
  information: z.string(),
  price: z.number(),
  discount: z.number(),
  photo_img_links: z.any(),
  color: z.string(),
});

export type MerchandiseSchema = z.infer<typeof MerchandiseSchema>;

const Merchandise = () => {
  const queryClient = useQueryClient();

  const { data: merch } = useQuery({
    queryKey: ["merch"],
    queryFn: getMerchandise,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MerchandiseSchema>({
    resolver: zodResolver(MerchandiseSchema),
  });

  const { mutate: createMutate, reset: createReset } = useMutation({
    mutationFn: createMerchandiseItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["merch"]);
      toast.success(`${data.message}`);
      createReset();
    },
    onError(error: any) {
      toast.error(error.response.merch.message || error.message);
    },
  });

  const onSubmit: SubmitHandler<MerchandiseSchema> = (data) => {
    createMutate(data);
  };

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
                              {...register("title")}
                            />
                            {errors.title && <p className="text-red-400 text-sm font-light">{errors.title.message}</p>}
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
                              {...register("color")}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-x-5">
                          <div className="flex flex-col gap-y-3">
                            <Label className="text-gray-500" htmlFor="itemDesc">
                              Item Description
                            </Label>
                            <Textarea className="w-full" id="itemDesc" {...register("information")} />
                            {errors.information && (
                              <p className="text-red-400 text-sm font-light">{errors.information.message}</p>
                            )}
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
          <div className="flex flex-row">
            {merch?.merchandise?.map((item: any) => {
              return <MerchandiseCard key={item._id.toString()} item={item} />;
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Merchandise;
