import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loader2, Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartItems, removeFromCart, updateCartItem } from "@/api/cart";
import useStore from "@/store";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { getAllMerchandise } from "@/api/merchandise";

const Cart = () => {
  const store = useStore();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartItems(store.authUser?.userId)
  });

  const { data: merch } = useQuery({
    queryKey: ["merch"],
    queryFn: getAllMerchandise
  })

  const { mutate: deleteMutate } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (cart) => {
      queryClient.invalidateQueries(["cart"]);
      toast.success(`${cart.msg}`,{ position: 'bottom-right' });
    },
    onError(error: any) {
      toast.error(error.response.cart.message || error.message, { position: 'bottom-right' })
    }
  })

  const handleRemoveFromCart = (merchId: any) => {
    const userId = Number(store.authUser?.userId)
    deleteMutate({ userId, merchId })
  }

  const totalPrice = data?.reduce((acc: any, cart: any) => {
    return acc + cart?.cart?.reduce((cartTotal: any, item: any) => {
      return cartTotal + (item.price * item.quantity);
    }, 0);
  }, 0);

  const { mutate: updateMutate, isLoading: updateIsLoading } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: (cart) => {
      queryClient.invalidateQueries(["cart"]);
      toast.success(`${cart.msg}`,{ position: 'bottom-right' });
    },
    onError(error: any) {
      toast.error(error.response.cart.message || error.message, { position: 'bottom-right' })
    }
  })

  const handleColorSelect = (item: any, merchItem: any) => {
    const userId = Number(store.authUser?.userId)
    const data = {
      merchId: merchItem._id,
      color: item,
    }

    updateMutate({ userId, data })
  }

  const handleSizeSelect = (item: any, merchItem: any) => {
    const userId = Number(store.authUser?.userId)
    const data = {
      merchId: merchItem._id,
      size: item,
    }

    updateMutate({ userId, data })
  }

  const handleOnClickDecrement = (merchId: any) => {
    const userId = Number(store.authUser?.userId)
    const data = {
      merchId: merchId,
      quantity: -1
    }

    updateMutate({ userId, data })
  }

  const handleOnClickIncrement = (merchId: any) => {
    const userId = Number(store.authUser?.userId)
    const data = {
      merchId: merchId,
      quantity: 1
    }

    updateMutate({ userId, data })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="relative">
          <ShoppingCart color="#fff" />
          <span
            className={
              data?.length > 0 && data[0].cart.length < 1
                ? "absolute top-[-5px] end-[-5px] bg-red-600 text-white font-bold rounded-full p-1 text-[15px] px-3 hidden"
                : "absolute top-[-5px] end-[-5px] bg-red-600 text-white font-bold rounded-full p-1 text-[15px] px-3"
            }
          >
            {data?.length > 0 && data[0].cart.length}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[85%] bg-[#fff]">
        <div className="flex flex-col mx-[3%]">
          <div className="grid grid-cols-1 sm:grid-cols-6 text-center bg-[#254872] text-white rounded-md shadow-md p-5 mt-5 mb-5">
            <span className="block sm:hidden">Items</span>
            <span className="sm:block hidden">Product</span>
            <span className="sm:block hidden">Size</span>
            <span className="sm:block hidden">Color</span>
            <span className="sm:block hidden">Price</span>
            <span className="sm:block hidden">Quantity</span>
            <span className="sm:block hidden">Action</span>
          </div>
          <ScrollArea className="h-[30em] w-full rounded-md">
            {data?.length > 0 && data?.map((cart: any) =>
              cart?.cart?.map((item: any) => {
                return (
                  <div key={item._id} className="grid grid-flow-rows grid-cols-6 bg-white rounded-md shadow-md p-5 items-center mb-5">
                    <div className="flex flex-cols gap-x-5 items-center">
                      <img src={item.image} alt="Product Image" className="w-[100px] h-[100px] rounded-md" />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex justify-center">
                    { item.size != '' &&
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={item.size.charAt(0).toUpperCase() + item.size.slice(1)} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sizes</SelectLabel>
                            {
                              merch?.merchandise?.map((merchItem: any) => (
                                merchItem._id === item.merchId &&
                                merchItem.size.split(',').map((item: any) => (
                                  <SelectItem
                                    key={Date.now()+item}
                                    value={item}
                                    onMouseDown={() => handleSizeSelect(item, merchItem)}
                                  >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                  </SelectItem>
                                ))
                              ))
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    }
                    </div>
                    <div className="flex justify-center">
                    { item.color != '' &&
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={item.color.charAt(0).toUpperCase() + item.color.slice(1)} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Colors</SelectLabel>
                            {
                              merch?.merchandise?.map((merchItem: any) => (
                                merchItem._id === item.merchId &&
                                merchItem.color.split(',').map((item: any) => (
                                  <SelectItem
                                    key={Date.now()+item}
                                    value={item}
                                    onMouseDown={() => handleColorSelect(item, merchItem)}
                                  >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                  </SelectItem>
                                ))
                              ))
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    }
                    </div>
                    <span className="text-center">&#8369;{item.price}</span>
                    <div className="flex flex-row justify-center items-center gap-x-10">
                      <Button onClick={() => handleOnClickDecrement(item.merchId)} disabled={updateIsLoading}>
                        {updateIsLoading ? <Loader2 className=" animate-spin" /> : <Minus size={15}/>}
                      </Button>
                      <span className="text-center">{item.quantity}</span>
                      <Button onClick={() => handleOnClickIncrement(item.merchId)} disabled={updateIsLoading}>
                        {updateIsLoading ? <Loader2 className=" animate-spin" /> : <Plus size={15}/>}
                      </Button>
                    </div>
                    <div className="flex flex-row justify-center">
                      <Button className="bg-red-600" onClick={() => handleRemoveFromCart(item.merchId)}>
                        <Trash size={20} />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </ScrollArea>
          <div className="flex flex-row justify-end items-center gap-x-10 p-5">
            <span className="bg-white rounded-md py-2 px-5 shadow-md">Order Total:&emsp;&#8369;{totalPrice}</span>
            <Button type="submit" className="bg-[#268EA7] hover:bg-[#3da7c2]">
              Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
