import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { CalendarPlus, Loader2Icon } from "lucide-react";

import { DialogContent } from "../ui/dialog";
import { getOrderById } from "@/api/order";
import { Separator } from "../ui/separator";

const ViewOrderModal = (orderId: any) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrderById(orderId.orderId),
  });

  if (isLoading) {
    return (
      <p className="text-center flex justify-center">
        <Loader2Icon className="animate-spin" />
      </p>
    );
  }

  return (
    <>
      <DialogContent>
        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="font-medium text-xs sm:text-2xl mr-2">Order ID:</span>
            <span className="font-medium text-base sm:text-2xl">{data.orderId}</span>
          </div>
          <div>
            <span
              className={`${
                data.orderStatus == "CANCELLED"
                  ? "text-red-500"
                  : data.orderStatus === "CLAIMED"
                  ? "text-green-500"
                  : "text-yellow-500"
              } font-medium text-[70%] sm:text-lg`}
            >
              {data.orderStatus}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-3">
          <CalendarPlus strokeWidth={2} />
          <span className="text-xs sm:text-lg">Order Date:</span>
          <span className="text-base sm:text-lg">{format(parseISO(data.orderDate), "PP")}</span>
        </div>
        <Separator className="my-2" />
        {data.cartItems?.map((item: any) => (
          <div className="" key={item._id}>
            <div className="flex items-center justify-between gap-x-4">
              <div className="flex items-center gap-x-4">
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
                    <span className="text-xs sm:text-sm text-gray-500">Size:&emsp;{item.size ? item.size : "N/A"}</span>
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
        <Separator className="" />
        <div className="flex justify-end">
          <span className="text-base sm:text-xl font-semibold">ORDER SUMMARY</span>
        </div>
        <div className="flex items-center justify-end">
          <span className="text-xs sm:text-lg mr-4">Total Amount:</span>
          <span className="text-xs sm:text-lg">
            &#8369;
            {data.cartItems?.reduce((total: any, item: any) => {
              return total + item.price * item.quantity;
            }, 0)}
          </span>
        </div>
      </DialogContent>
    </>
  );
};

export default ViewOrderModal;
