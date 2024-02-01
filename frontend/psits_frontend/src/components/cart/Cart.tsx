import { Loader2, Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import { createOrder } from "@/api/order";
import { emptycart } from "@/assets";
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
import { Separator } from "../ui/separator";

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
      queryClient.invalidateQueries(["cart"])
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
        <Button variant="link" className="m-0 p-0">
          <ShoppingCart color="#fff" />
          <span
            className={
              cart?.length > 0 && cart[0].cart.length < 1
                ? "hidden"
                : "relative top-[-20px] right-[-2px] bg-red-500 text-white font-bold rounded-full sm:py-[1.5px] px-1 py-[0.5px] sm:text-sm text-xs sm:px-2"
            }
          >
            {cart?.length > 0 ? cart[0].cart.length : ""}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] max-h-[90%] md:h-[700px] md:w-[70%] flex flex-col bg-white text-sm justify-between">
        <ScrollArea className="mt-4 w-full rounded-md">
          {cart?.length > 0 && cart[0]?.cart?.length > 0 ? (
            cart?.map(
              (cart: any) =>
                cart?.cart?.map((item: any) => (
                  <div className="flex flex-col mb-4 border py-4 rounded" key={item._id}>
                    <div className="grid grid-cols-1 sm:grid-cols-6 flex-wrap justify-items-center gap-y-4">
                      <div className="flex flex-col gap-2 items-center w-full sm:w-[200px]">
                        <img
                          src={item.image}
                          alt="Product Image"
                          className="w-[100px] h-[100px] rounded-lg p-3 border-2"
                        />
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        {item.size != "" && (
                          <Select>
                            <SelectTrigger className="w-[260px] sm:w-[150px]">
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
                      <div className="flex items-center justify-center">
                        {item.color != "" && (
                          <Select>
                            <SelectTrigger className="w-[260px] sm:w-[150px]">
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
                      <div className="flex flex-row gap-x-20 sm:gap-x-5 items-center justify-center">
                        <Button onClick={() => handleOnClickDecrement(item.merchId)}>
                          <Minus size={15} />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button onClick={() => handleOnClickIncrement(item.merchId)}>
                          <Plus size={15} />
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <span className="text-center">&#8369;{item.price}</span>
                      </div>
                      <div className="flex items-center">
                        <Button
                          className="bg-red-600 w-[260px] sm:w-[100%]"
                          onClick={() => handleRemoveFromCart(item.merchId)}
                        >
                          <Trash size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )),
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <img className="md:max-w-[400px] block mb-8" src={emptycart} alt="under-construction" />
              <h3 className="text-xl md:text-3xl font-bold mb-4">Looks like your cart is empty!</h3>
            </div>
          )}
        </ScrollArea>
        <form className="flex flex-col gap-y-4 text-base">
          <Separator className="" />
          <div className="flex justify-end">
            <span className="font-semibold">PRICE SUMMARY</span>
          </div>
          <div className="flex flex-row justify-end gap-x-2">
            <span>Cart Total:</span>
            <span>&#8369;&nbsp;{totalPrice}</span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                className="bg-[#268EA7] hover:bg-[#3da7c2] w-full mt-5"
                disabled={cart && cart.length > 0 && cart[0].cart.length > 0 ? false : true}
              >
                {isLoading ? <Loader2 className=" animate-spin" /> : "CONFIRM ORDER"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm your order?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will create an order and redirect you to your orders directly.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmOrder} className="bg-[#074873] hover:bg-[#2d7db3]">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
