import { toast } from "react-toastify";
import { Loader2, Pencil, Plus } from "lucide-react";
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
import { useEffect, useState } from "react";
import { Stock } from "@/pages/admin/AdminMerchandise";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

interface MerchandiseUpdateCardProps {
  item: {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    stocks: [
      {
        size: string,
        quantity: number
      }
    ];
    images: [
      {
        image: string;
        imagePublicId: string;
      },
    ];
    color: string;
  };
}

const ItemStocksSchema = z.object({
  size: z.string(),
  quantity: z.number()
})

const MerchandiseSchema = z.object({
  name: z.string().nonempty("This field is required."),
  description: z.string().nonempty("This field is required."),
  price: z.number(),
  // discount: z.number(),
  images: z.any(),
  color: z.string(),
  stocks: ItemStocksSchema.array(),
});

type MerchandiseSchema = z.infer<typeof MerchandiseSchema>;

const MerchandiseUpdateCard = ({ item }: MerchandiseUpdateCardProps) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState<string[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MerchandiseSchema>({
    resolver: zodResolver(MerchandiseSchema),
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

  const handleSetStocks = (event: any, data: Stock) => {
    const existingStockIndex = stocks.findIndex(stock => stock.size === data.size);
    const updatedStocks = [...stocks];

    if (existingStockIndex !== -1) {
        updatedStocks[existingStockIndex] = data;
        setStocks(updatedStocks.filter(stock => sizes.includes(stock.size)));
        setValue("stocks", updatedStocks.filter(stock => sizes.includes(stock.size)))
  } else {
        setStocks(prevStocks => [...prevStocks, data]);
      }
  }

  useEffect(() => {
    if(item.stocks && item.stocks.length > 0) {
      setSizes(item.stocks.map((stock) => stock.size))
      setStocks(item.stocks)
    }
    
  }, [item])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6 bg-[#268EA7] hover:bg-[#3da7c2]">
            <Pencil size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95%] sm:max-w-[60%]">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="flex flex-col sm:flex-row gap-x-10 my-5 mx-5 items-center">
              <div className="flex flex-col justify-center w-[50%]">
                <div className="flex justify-center relative">
                  <div className="border rounded-md flex justify-center p-2">
                    <img
                      src={file !== "" ? file : item.images[0].image}
                      className="object-contain"
                    />
                  </div>
                  <Label htmlFor="img">
                    <Plus
                      className="bg-[#000] bg-opacity-100 hover:bg-[#353535] w-[40px] h-[40px] rounded-full absolute bottom-[-3%] end-[-4%] p-2"
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
              </div>
              <div className="flex flex-col gap-y-5 w-full sm:w-[50%]">
                <div className="flex flex-col gap-x-5 gap-y-5">
                  <div className="flex flex-col gap-2 mt-5 sm:mt-0">
                    <Label className="text-gray-500" htmlFor="itemName">
                      Item Name
                    </Label>
                    <Input
                      autoComplete="off"
                      id="itemName"
                      placeholder="Enter item name"
                      {...register("name")}
                      defaultValue={item.name}
                    />
                    {errors.name && <p className="text-red-400 text-sm font-light">{errors.name.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500" htmlFor="itemPrice">
                      Item Price
                    </Label>
                    <Input
                      autoComplete="off"
                      id="itemPrice"
                      placeholder="Enter item price"
                      className="w-full"
                      type="number"
                      {...register("price", { valueAsNumber: true })}
                      defaultValue={item.price}
                    />
                    {errors.price && <p className="text-red-400 text-sm font-light">{errors.price.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500" htmlFor="itemColors">
                      Item Colors
                    </Label>
                    <Input
                      autoComplete="off"
                      id="itemColors"
                      placeholder="Enter item colors (White,Black,Red)"
                      className="w-full"
                      {...register("color")}
                      defaultValue={item.color}
                    />
                    {errors.name && <p className="text-red-400 text-sm font-light">{errors.name.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500">
                      Item Sizes
                    </Label>
                    <ToggleGroup
                      value={sizes}
                      onValueChange={(value) => setSizes(value)}
                      type="multiple"
                      className="justify-start gap-2"
                    >
                      <ToggleGroupItem value="XS" aria-label="Toggle XS">
                        <h1>XS</h1>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="SM" aria-label="Toggle SM">
                        <h1>SM</h1>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="MD" aria-label="Toggle MD">
                        <h1>MD</h1>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="LG" aria-label="Toggle LG">
                        <h1>LG</h1>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="XL" aria-label="Toggle XL">
                        <h1>XL</h1>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="XXL" aria-label="Toggle XXL">
                        <h1>XXL</h1>
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <div className="flex flex-wrap gap-2">
                      {
                        sizes.map((size) => {
                          const stockItem = item.stocks.find((stock) => stock.size === size) || { quantity: "" };

                          return (
                            <div key={size}>
                              <Label className="text-gray-500" htmlFor={`itemSize_${size}`}>
                                Stock for {size}
                              </Label>
                              <Input
                                autoComplete="off"
                                id={`itemSize_${size}`}
                                placeholder={`Quantity for ${size}`}
                                type="number"
                                className="w-[150px]"
                                onChange={(event) => handleSetStocks(event, { size: size, quantity: parseInt(event?.target.value) })}
                                defaultValue={stockItem.quantity}
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-500" htmlFor="itemDescription">
                    Item Description
                  </Label>
                  <Textarea
                    autoComplete="off"
                    id="itemDescription"
                    placeholder="Enter item description"
                    className="w-full resize-none"
                    rows={3}
                    {...register("description")}
                    defaultValue={item.description}
                  />
                  {errors.description && <p className="text-red-400 text-sm font-light">{errors.description.message}</p>}
                </div>
                <Button type="submit" disabled={updateIsLoading}>
                  {updateIsLoading ? <Loader2 className=" animate-spin" /> : "Update"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  );
};

export default MerchandiseUpdateCard;