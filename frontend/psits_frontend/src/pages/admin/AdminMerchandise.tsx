import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const [sizes, setSizes] = useState([""]);
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
      description: "",
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
          <Button type="submit" className="mb-6 bg-[#268EA7] hover:bg-[#3da7c2]">
            Create Merchandise
          </Button>
        </DialogTrigger>
        <DialogContent className="min-h-[70%] max-w-[60%] bg-white">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="flex justify-center mt-10 items-center gap-10">
              <div>
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
                  <div className="bg-gray-100 h-[400px] w-[300px] rounded shadow border relative col-span-2">
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
              </div>
              <div className="min-w-[300px]">
                <div className="flex gap-8 mb-4">
                  <div className="flex flex-col gap-2 w-full">
                    <Label className="text-gray-500" htmlFor="itemName">
                      Item Name
                    </Label>
                    <Input
                      autoComplete="off"
                      id="itemName"
                      placeholder="Enter item name"
                      className="w-[250px]"
                      {...register("name")}
                    />
                    {errors.name && <p className="text-red-400 text-sm font-light">{errors.name.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label className="text-gray-500" htmlFor="itemPrice">
                      Item Price
                    </Label>
                    <Input
                      autoComplete="off"
                      id="itemPrice"
                      placeholder="Enter item price"
                      type="number"
                      className="w-[150px]"
                      {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price && <p className="text-red-400 text-sm font-light">{errors.price.message}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <Label className="text-gray-500" htmlFor="itemSize">
                    Item Size
                  </Label>
                  {/* <Input
                      className="w-[250px]"
                      autoComplete="off"
                      id="itemSize"
                      placeholder="Enter item size"
                      {...register("size")}
                    />
                    {errors.size && <p className="text-red-400 text-sm font-light">{errors.size.message}</p>} */}
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
                  <div className="flex gap-2 flex-wrap basis-1/3">
                    {sizes.map(
                      (size) =>
                        size && (
                          <div key={size}>
                            <Input
                              autoComplete="off"
                              id={`itemSize_${size}`}
                              placeholder={`Quantity for ${size}`}
                              type="number"
                              className="mb-2 w-[150px]"
                            />
                          </div>
                        ),
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <Label className="text-gray-500" htmlFor="itemColor">
                    Item Color
                  </Label>
                  <Input
                    className="w-[150px]"
                    autoComplete="off"
                    id="itemColor"
                    placeholder="Enter item color"
                    {...register("color")}
                  />
                  {errors.color && <p className="text-red-400 text-sm font-light">{errors.color.message}</p>}
                </div>
                {/* <div className="flex flex-col gap-y-3 mb-4">
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
                </div> */}
                <div className="flex flex-col gap-y-3">
                  <Label className="text-gray-500" htmlFor="itemDesc">
                    Item Description
                  </Label>
                  <Textarea
                    className="w-full"
                    placeholder="Enter description here"
                    id="itemDesc"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm font-light">{errors.description.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full mt-4" disabled={createIsLoading}>
                  {createIsLoading ? <Loader2 className=" animate-spin" /> : "Post"}
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
