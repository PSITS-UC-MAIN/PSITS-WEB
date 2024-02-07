import { useEffect, useState } from "react";
import { Loader2, PackagePlus, Plus } from "lucide-react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MerchandiseTable from "@/components/tables/MerchandiseTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createMerchandiseItem } from "@/api/merchandise";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { previousDay } from "date-fns";

export interface Stock {
  size: string,
  quantity: number
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
  stocks: ItemStocksSchema.array()
});

export type MerchandiseSchema = z.infer<typeof MerchandiseSchema>;

const AdminMerchandise = () => {
  const [sizes, setSizes] = useState([""]);
  const [stocks, setStocks] = useState<Stock[]>([])
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MerchandiseSchema>({
    resolver: zodResolver(MerchandiseSchema)
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

  const onSubmit: SubmitHandler<MerchandiseSchema> = (data) => {
    const formData = new FormData();

    if (data.images.length > 0) {
      for (let i = 0; i < data.images.length; formData.append("images", data.images[i]), i++);
      formData.append("merch", JSON.stringify(data));
      createMutate(formData);
    } else {
      data.images = "";
      createMutate(data);
    }

    reset()
  };

  const handleSetStocks = (event: any, data: Stock) => {
    const existingStockIndex = stocks.findIndex(stock => stock.size === data.size);
    
    if (existingStockIndex !== -1) {
      const updatedStocks = [...stocks];
      updatedStocks[existingStockIndex] = data;
      setStocks(updatedStocks.filter(stock => sizes.includes(stock.size)));
      setValue("stocks", updatedStocks.filter(stock => sizes.includes(stock.size)))
  } else {
      setStocks(prevStocks => [...prevStocks, data]);
    }
  }

  return (
    <Wrapper title="PSITS Admin | Merchandise" noMargin>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6" variant="ghost">
            <PackagePlus />&emsp;Create Merchandise Item
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[95%] sm:max-w-[60%]">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="flex flex-col sm:flex-row gap-x-10 my-5 mx-5 items-center">
              <div className="flex flex-col justify-center w-[50%]">
                {file != "" ? (
                  <div className="flex justify-center relative">
                    <div className="border rounded-md flex justify-center p-2">
                      <img src={file} className="object-contain" />
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
                ) : (
                  <div className="bg-gray-100 h-[40vh] sm:h-[40vh] w-[75vw] sm:w-[20vw] rounded shadow border relative col-span-2">
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
                )}
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
                    />
                    {errors.name && <p className="text-red-400 text-sm font-light">{errors.name.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-gray-500" htmlFor="itemStocks">
                      Item Sizes
                    </Label>
                    <ToggleGroup
                      value={sizes}
                      onValueChange={(value) => setSizes(value)}
                      type="multiple"
                      className="justify-start gap-2"
                      id="itemStocks"
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
                      {sizes.map(
                        (size) =>
                          size && (
                            <div key={size}>
                              <Input
                                autoComplete="off"
                                id={`itemSize_${size}`}
                                placeholder={`Quantity for ${size}`}
                                type="number"
                                className="w-[150px]"
                                onChange={(event) => handleSetStocks(event, { size: size, quantity: parseInt(event?.target.value) })}
                              />
                            </div>
                          ),
                      )}
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
                  />
                  {errors.description && <p className="text-red-400 text-sm font-light">{errors.description.message}</p>}
                </div>
                <Button type="submit" disabled={createIsLoading}>
                  {createIsLoading ? <Loader2 className=" animate-spin" /> : "Create"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <MerchandiseTable />
    </Wrapper>
  );
};

export default AdminMerchandise;