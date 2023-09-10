import { Loader2, Minus, Plus, ShoppingCart, Ticket, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useStore from "@/store";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getCartItems, removeFromCart, updateCartItem } from "@/api/cart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { getAllMerchandise } from "@/api/merchandise";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/api/order";

const Cart = () => {
  const store = useStore();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartItems(store.authUser?._id),
  });

  const { data: merch } = useQuery({
    queryKey: ["merch"],
    queryFn: getAllMerchandise,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (cart) => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError(error: any) {
      toast.error(error.response.cart.message || error.message, { position: "bottom-right" });
    },
  });

  const handleRemoveFromCart = (merchId: any) => {
    const userId = store.authUser?._id || "";

    deleteMutate({ userId, merchId });
  };

  const totalPrice = cart?.reduce((acc: any, cart: any) => {
    return (
      acc +
      cart?.cart?.reduce((cartTotal: any, item: any) => {
        return cartTotal + item.price * item.quantity;
      }, 0)
    );
  }, 0);

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: (cart) => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError(error: any) {
      toast.error(error.response.cart.message || error.message, { position: "bottom-right" });
    },
  });

  const handleColorSelect = (item: any, merchItem: any) => {
    const userId = store.authUser?.userId || "";
    const data = {
      merchId: merchItem._id,
      color: item,
    };

    updateMutate({ userId, data });
  };

  const handleSizeSelect = (item: any, merchItem: any) => {
    const userId = store.authUser?.userId || "";
    const data = {
      merchId: merchItem._id,
      size: item,
    };

    updateMutate({ userId, data });
  };

  const handleOnClickDecrement = (merchId: any) => {
    const userId = store.authUser?.userId || "";
    const data = {
      merchId: merchId,
      quantity: -1,
    };

    updateMutate({ userId, data });
  };

  const handleOnClickIncrement = (merchId: any) => {
    const userId = store.authUser?.userId || "";
    const data = {
      merchId: merchId,
      quantity: 1,
    };

    updateMutate({ userId, data });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries(["order"]);
      toast.success(`${order.msg}`, { position: "bottom-right" });
      setOpen(false);
      navigate("/orders");
    },
    onError(error: any) {
      toast.error(error.response.cart.msg || error.msg, { position: "bottom-right" });
    },
  });

  const handleConfirmOrder = () => {
    const userId = store.authUser?._id || "";
    const data = { cartItems: cart[0].cart };
    if (cart[0].cart.length > 0) mutate({ userId, data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="relative">
          <ShoppingCart color="#fff" />
          <span
            className={
              cart?.length > 0 && cart[0].cart.length < 1
                ? "absolute top-[-5px] end-[-5px] bg-red-600 text-white font-bold rounded-full p-1 text-[15px] px-3 hidden"
                : "absolute top-[-5px] end-[-5px] bg-red-600 text-white font-bold rounded-full p-1 text-[15px] px-3"
            }
          >
            {cart?.length > 0 && cart[0].cart.length}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] min-h-[90%] max-h-[90%] bg-[#fff] text-sm">
        <div className="flex flex-row sm:flex-nowrap flex-wrap mx-[2%] mt-10 gap-x-10">
          <div className="flex flex-col min-w-[80%]">
            <ScrollArea className="max-h-[90%] h-[100%] w-full rounded-md">
              <div className="p-4">
                {cart?.length > 0 &&
                  cart?.map(
                    (cart: any) =>
                      cart?.cart?.map((item: any) => (
                        <div
                          key={item._id}
                          className="grid sm:grid-flow-rows sm:grid-cols-6 grid-flow-rows grid-cols-1 bg-white rounded-md border-2 border-gray-100 shadow-lg p-5 items-center mb-5"
                        >
                          <div className="flex flex-col gap-y-5 items-center">
                            <img src={item.image} alt="Product Image" className="w-[100px] h-[100px] rounded-md" />
                            <span>{item.name}</span>
                          </div>
                          <div className="flex justify-center">
                            {item.size != "" && (
                              <Select>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder={item.size.charAt(0).toUpperCase() + item.size.slice(1)} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Sizes</SelectLabel>
                                    {merch?.merchandise?.map(
                                      (merchItem: any) =>
                                        merchItem._id === item.merchId &&
                                        merchItem.size.split(",").map((item: any) => (
                                          <SelectItem
                                            key={Date.now() + merchItem._id + item}
                                            value={item}
                                            onMouseDown={() => handleSizeSelect(item, merchItem)}
                                          >
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                          </SelectItem>
                                        )),
                                    )}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                          <div className="flex justify-center">
                            {item.color != "" && (
                              <Select>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder={item.color.charAt(0).toUpperCase() + item.color.slice(1)} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Colors</SelectLabel>
                                    {merch?.merchandise?.map(
                                      (merchItem: any) =>
                                        merchItem._id === item.merchId &&
                                        merchItem.color.split(",").map((item: any) => (
                                          <SelectItem
                                            key={Date.now() + item}
                                            value={item}
                                            onMouseDown={() => handleColorSelect(item, merchItem)}
                                          >
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                          </SelectItem>
                                        )),
                                    )}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                          <span className="text-center">&#8369;{item.price}</span>
                          <div className="flex flex-row justify-center items-center gap-x-10">
                            <Button onClick={() => handleOnClickDecrement(item.merchId)}>
                              <Minus size={15} />
                            </Button>
                            <span className="text-center">{item.quantity}</span>
                            <Button onClick={() => handleOnClickIncrement(item.merchId)}>
                              <Plus size={15} />
                            </Button>
                          </div>
                          <div className="flex flex-row justify-center">
                            <Button className="bg-red-600" onClick={() => handleRemoveFromCart(item.merchId)}>
                              <Trash size={20} />
                            </Button>
                          </div>
                        </div>
                      )),
                  )}
              </div>
            </ScrollArea>
          </div>
          <form className="flex flex-col gap-y-5">
            <span className="mt-5 font-semibold">OFFERS</span>
            <div className="flex flex-row items-center gap-x-5">
              <Ticket size={35} />
              <Input placeholder="APPLY COUPON CODE" className="border-0" />
            </div>
            <Separator />
            <span className="font-semibold">PRICE SUMMARY</span>
            <div className="flex flex-row justify-between">
              <span>Subtotal</span>
              <span>&#8369;&nbsp;{totalPrice}</span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Order Total</span>
              <span>&#8369;&nbsp;{totalPrice}</span>
            </div>
            <Separator />
            <div className="flex">
              <span className="text-xs text-gray-400 text-justify">
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi
                Lorem pariatur mollit ex esse exercitation amet. Nisi animcupidatat excepteur officia. Reprehenderit
                nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.
              </span>
            </div>
            {cart && cart.length > 0 && cart[0].cart.length > 0 && (
              <Button
                type="button"
                className="bg-[#268EA7] hover:bg-[#3da7c2] w-full mt-10"
                onClick={handleConfirmOrder}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className=" animate-spin" /> : "CONFIRM ORDER"}
              </Button>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
