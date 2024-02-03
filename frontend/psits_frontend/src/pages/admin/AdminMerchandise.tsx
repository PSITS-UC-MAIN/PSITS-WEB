import { useState } from "react";
import { Loader2, PackagePlus, Plus } from "lucide-react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import MerchandiseTable from "@/components/tables/MerchandiseTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createMerchandiseItem } from "@/api/merchandise";

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

export type MerchandiseSchema = z.infer<typeof MerchandiseSchema>;

const AdminMerchandise = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MerchandiseSchema>({
    resolver: zodResolver(MerchandiseSchema),
    defaultValues: {
      price: 0,
      discount: 0,
      color: "",
      description: "Type description here",
    },
  });

  const {
    mutate: createMutate,
    reset: createReset,
    isLoading: createIsLoading,
  } = useMutation({
    mutationFn: createMerchandiseItem,
    onSuccess: (merch) => {
      queryClient.invalidateQueries(["merch"]);
      toast.success(`${merch.msg}`, { position: "bottom-right" });
      createReset();
    },
    onError(error: any) {
      toast.error(error.response.merch.message || error.message, { position: "bottom-right" });
    },
  });

  const onSubmit: SubmitHandler<MerchandiseSchema> = (data: any) => {
    const formData = new FormData();

    if (data.images.length > 0) {
      for (let i = 0; i < data.images.length; formData.append("images", data.images[i]), i++);
      formData.append("merch", JSON.stringify(data));
      createMutate(formData);
    } else {
      data.images = "";
      createMutate(data);
    }
  };

  const [file, setFile] = useState("");

  return (
    <Wrapper title="PSITS Admin | Merchandise" noMargin>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-6" variant="ghost">
            <PackagePlus />&emsp;Create Merchandise Item
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[85%] min-w-[700px] bg-white">
          <ScrollArea>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <div className="flex flex-col mt-10 gap-y-4 items-center mx-4">
                {file != "" ? (
                  <div className="flex justify-center relative">
                    <div className="border flex justify-center p-2 ">
                      <img src={file} className="object-cover" />
                    </div>
                    <Label htmlFor="img">
                      <Plus
                        className="bg-[#000] bg-opacity-100 hover:bg-[#353535] w-[40px] h-[40px] rounded-full absolute bottom-3 end-[28%] p-2"
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
                ) : (
                  <div className="bg-gray-200 h-[300px] w-[50%] rounded-lg shadow-lg relative col-span-2">
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
                )}
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
                    <Input autoComplete="off" id="itemSize" placeholder="Enter item size" {...register("size")} />
                    {errors.size && <p className="text-red-400 text-sm font-light">{errors.size.message}</p>}
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <Label className="text-gray-500" htmlFor="itemColor">
                      Item Color
                    </Label>
                    <Input autoComplete="off" id="itemColor" placeholder="Enter item color" {...register("color")} />
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
                      {...register("stocks", { valueAsNumber: true })}
                    />
                    {errors.stocks && <p className="text-red-400 text-sm font-light">{errors.stocks.message}</p>}
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <Label className="text-gray-500" htmlFor="itemDesc">
                      Item Description
                    </Label>
                    <Textarea className="w-full" id="itemDesc" {...register("description")} />
                    {errors.description && (
                      <p className="text-red-400 text-sm font-light">{errors.description.message}</p>
                    )}
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={createIsLoading}>
                  {createIsLoading ? <Loader2 className=" animate-spin" /> : "Post"}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <MerchandiseTable />
    </Wrapper>
  );
};

export default AdminMerchandise;
