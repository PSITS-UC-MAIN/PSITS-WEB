import { getCurrentUserOrders, updateOrder } from "@/api/order";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useStore from "@/store";
import { Item } from "@radix-ui/react-navigation-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseISO, addDays } from "date-fns";
import { CalendarPlus } from "lucide-react";
import { toast } from "react-toastify";

const Orders = () => {
  const store = useStore();
  const queryClient = useQueryClient();

  const { data: orderData } = useQuery({
    queryKey: ["order"],
    queryFn: () => getCurrentUserOrders(store.authUser?._id || ""),
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries(["order"]);
      toast.success(`${order.msg}`, { position: "bottom-right" });
    },
    onError: (error: any) => {
      toast.error(error.response.order.msg || error.msg, { position: "bottom-right" });
    },
  });

  const handleDateFormat = (date: string, days: number) => format(addDays(parseISO(date), days), "PP");

  const handleUpdateStatus = (orderId: any) => {
    const userId = store.authUser?._id || "";
    const data = { orderStatus: "CANCELLED", orderId: orderId };
    updateMutate({ userId, data });
  };

  return (
    <Wrapper title="PSITS | My Orders" className="my-20 sm:mx-[20%] mx-5" noMargin>
      { orderData?.userOrders?.length > 0 ?
        orderData?.userOrders?.map((order: any) => (
          <div className="flex flex-col gap-y-5 shadow-lg border-2 p-5 mb-10" key={order._id}>
            <div className="flex flex-row items-center gap-x-3">
              <span className="font-medium text-xs sm:text-2xl">Order ID:</span>
              <span className="font-medium text-base sm:text-2xl">{order._id}</span>
              <span className="text-gray-500 font-light text-[70%] sm:text-lg">[{order.orderStatus}]</span>
            </div>
            <div className="flex flex-row items-center gap-x-3 text-[#58A536]">
              <CalendarPlus color="#58A536" strokeWidth={2} />
              <span className="font-medium text-xs sm:text-xl">Order Date:</span>
              <span className="font-medium text-base sm:text-xl">{handleDateFormat(order.orderDate,0)}</span>
            </div>
            <Separator />
            {order?.cartItems?.map((item: any) => (
              <div className="flex flex-col" key={item._id}>
                <div className="flex flex-row items-center justify-between gap-x-5">
                  <div className="flex flex-row items-center gap-x-5">
                    <img src={item.image} alt="Product Image" className="h-[100px] sm:h-[150px] w-[100px] sm:w-[150px] rounded-lg p-3 bg-[#fafafa] border-2 border-gray-150" />
                    <div className="flex flex-col gap-y-3">
                      <span className="text-sm sm:text-lg">{item.name}</span>
                      <div className="flex flex-row flex-wrap">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Color:&emsp;{item.color ? item.color : "N/A"}&emsp;|&emsp;
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          Size:&emsp;{item.size? item.size: "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3 items-center">
                    <span className="text-xs sm:text-base">&#8369;&nbsp;{item.price}</span>
                    <span className="text-[60%] sm:text-xs text-gray-500">Qty: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex flex-row justify-end">
              <span className="text-base sm:text-2xl font-semibold">ORDER SUMMARY</span>
            </div>
            <div className="flex flex-row items-center justify-end gap-x-10">
              <span className="text-xs sm:text-xl">Subtotal</span>
              <span className="text-xs sm:text-xl">&#8369;&nbsp;
                {order?.cartItems?.reduce((total: any, item: any) => {
                  return total + item.price * item.quantity;
                }, 0)}
              </span>
            </div>
            <div className="flex flex-row items-center justify-end gap-x-10">
              <span className="text-xs sm:text-xl">Total</span>
              <span className="text-xs sm:text-xl">&#8369;&nbsp;
                {order?.cartItems?.reduce((total: any, item: any) => {
                  return total + item.price * item.quantity;
                }, 0)}
              </span>
            </div>
            <Separator/>
            <div className="flex">
              <span className="text-[60%] sm:text-xs text-gray-500 font-light">
                {order.additionalInfo == "" && "You may disregard this remark"}
              </span>
              <span></span>
            </div>
          </div>

        ))
      ) : (
        <div className="flex justify-center mt-[20%]">
          <span className="text-2xl">No Orders Yet&emsp;{":(("}</span>
        </div>
      )}
    </Wrapper>
  );
};

export default Orders;
