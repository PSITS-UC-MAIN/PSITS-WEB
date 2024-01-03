import { toast } from "react-toastify";
import { CalendarPlus } from "lucide-react";
import { format, parseISO, addDays } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentUserOrders, updateOrder } from "@/api/order";
import { emptyorders } from "@/assets";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useStore from "@/store";

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
    <Wrapper title="PSITS | My Orders" className="my-20 sm:mx-[25%] mx-5" noMargin>
      {orderData?.userOrders?.length > 0 ? (
        orderData?.userOrders?.map((order: any) => (
          <div className="flex flex-col shadow border rounded p-4 mb-10" key={order._id}>
            <div className="flex items-center justify-between gap-x-2">
              <div>
                <span className="font-medium text-xs sm:text-2xl">Order ID:</span>
                <span className="font-medium text-base sm:text-2xl">{order.orderId}</span>
              </div>
              <div>
                <span
                  className={`${
                    order.orderStatus == "CANCELLED"
                      ? "text-red-500"
                      : order.orderStatus === "CLAIMED"
                      ? "text-green-500"
                      : "text-yellow-500"
                  } font-medium text-[70%] sm:text-lg`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-3">
              <CalendarPlus strokeWidth={2} />
              <span className="text-xs sm:text-lg">Order Date:</span>
              <span className="text-base sm:text-lg">{handleDateFormat(order.orderDate, 0)}</span>
            </div>
            <Separator className="my-4" />
            {order?.cartItems?.map((item: any) => (
              <div className="flex flex-col" key={item._id}>
                <div className="flex flex-row items-center justify-between gap-x-4">
                  <div className="flex flex-row items-center gap-x-4">
                    <img
                      src={item.image}
                      alt="Product Image"
                      className="h-[100px] sm:h-[120px] w-[100px] sm:w-[120px] object-contain rounded-lg p-3 bg-[#fafafa] border-2 border-gray-150"
                    />
                    <div className="flex flex-col gap-y-3">
                      <span className="text-sm sm:text-lg">{item.name}</span>
                      <div className="flex flex-row flex-wrap">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Color:&emsp;{item.color ? item.color : "N/A"}&emsp;|&emsp;
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          Size:&emsp;{item.size ? item.size : "N/A"}
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
            <Separator className="my-4" />
            <div className="flex justify-end">
              <span className="text-base sm:text-xl font-semibold mb-2">ORDER SUMMARY</span>
            </div>
            <div className="flex items-center justify-end gap-x-5">
              <span className="text-xs sm:text-lg">Subtotal</span>
              <span className="text-xs sm:text-lg">
                &#8369;&nbsp;
                {order?.cartItems?.reduce((total: any, item: any) => {
                  return total + item.price * item.quantity;
                }, 0)}
              </span>
            </div>
            <div className="flex items-center justify-end gap-x-5">
              <span className="text-xs sm:text-lg">Total</span>
              <span className="text-xs sm:text-lg">
                &#8369;&nbsp;
                {order?.cartItems?.reduce((total: any, item: any) => {
                  return total + item.price * item.quantity;
                }, 0)}
              </span>
            </div>
            <Separator className="my-4" />
            <div className="flex mb-4">
              <span className="text-[60%] sm:text-xs text-gray-500 font-light">
                {order.additionalInfo == "" && "You may disregard this remark"}
              </span>
            </div>
            {order.orderStatus == "PENDING" && (
              <Button
                className="bg-red-600 hover:bg-red-500"
                onClick={() => handleUpdateStatus(order._id)}
                disabled={
                  order.orderStatus == "CANCELLED" || order.orderStatus == "CLAIMED" || order.orderStatus == "ORDERDED"
                }
              >
                CANCEL
              </Button>
            )}
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <img
            className="md:max-w-[600px] sm:max-w-[400px] block mb-8 mt-20"
            src={emptyorders}
            alt="under-construction"
          />
          <h3 className="text-xl md:text-3xl font-bold mb-4">No Orders Yet&emsp;{":("}</h3>
        </div>
      )}
    </Wrapper>
  );
};

export default Orders;
