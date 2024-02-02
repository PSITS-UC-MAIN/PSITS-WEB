import { toast } from "react-toastify";
import { FileEdit, Loader2, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateMerchandiseItem } from "@/api/merchandise";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface MerchandiseUpdateCardProps {
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

const MerchandiseUpdateCard = ({ item }: MerchandiseUpdateCardProps) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader>
        <DialogTrigger asChild>
          <Button className="bg-[#268EA7] hover:bg-[#3da7c2] py-[7.5%] rounded-md">
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
  );
};

export default MerchandiseUpdateCard;