import { getCurrentUserOrders, updateOrder } from "@/api/order";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useStore from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseISO, addDays } from "date-fns";
import { CalendarPlus } from "lucide-react";
import { toast } from "react-toastify";

const Orders = () => {
  const store = useStore()
  const queryClient = useQueryClient();

  const { data: orderData } = useQuery({
    queryKey: ["order"],
    queryFn: () => getCurrentUserOrders(store.authUser?._id || "")
  })

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries(["order"]);
      toast.success(`${order.msg}`, { position: 'bottom-right' });
    },
    onError: (error: any) => {
      toast.error(error.response.order.msg || error.msg, { position: 'bottom-right' });
    }
  })

  const handleDateFormat = (date: string, days: number) => format(addDays(parseISO(date),days), "PP")

  const handleUpdateStatus = (orderId: any) => {
    const userId = store.authUser?._id || "";
    const data = { orderStatus: "CANCELLED", orderId: orderId }
    updateMutate({ userId, data })
  }

  return (
    <Wrapper title="PSITS | My Orders" className="my-20 mx-[20%]" noMargin>
      { orderData?.userOrders?.length > 0 ?
        orderData?.userOrders?.map((order: any) => (
          <div className="flex flex-col gap-y-8 mb-10 border-2 shadow-lg p-10 rounded-lg" key={order._id}>
            <div className="flex flex-row justify-between orders-center">
              <div className="flex flex-row items-center gap-x-5">
                <span className="text-4xl font-medium">Order ID: {order._id}</span>
                <span className="text-gray-500">{order.orderStatus}</span>
              </div>
              <Button
                className={
                  order.orderStatus == "CANCELLED" || order.orderStatus == "CLAIMED" || order.orderStatus == "PENDING" ?
                  "bg-red-600 hover:bg-red-500 text-xl hidden" : "bg-red-600 hover:bg-red-500 text-xl"
                }
                onClick={() => handleUpdateStatus(order._id)}
              >
                CANCEL
              </Button>
            </div>
            <div className="flex flex-row orders-center">
              <div className="flex flex-row gap-x-5 text-[#58A536]">
                <CalendarPlus color="#58A536" strokeWidth={1} />
                <span className="font-light">Order Date:</span>
                <span className="font-semibold">{handleDateFormat(order.orderDate,0)}</span>
              </div>
            </div>
            <Separator/>
            {order?.cartItems?.map((item: any) => (
              <div className="flex flex-col" key={item._id}>
                <div className="flex flex-row items-center justify-between gap-x-5">
                  <div className="flex flex-row items-center gap-x-5">
                    <img src={item.image} alt="Product Image" className="h-[150px] w-[150px] rounded-lg p-5 bg-[#fafafa] border-2 border-gray-150" />
                    <div className="flex flex-col gap-y-3">
                      <span className="text-lg">{item.name}</span>
                      <span className="text-sm text-gray-500">
                        Color:&emsp;{item.color ? item.color : "N/A"}&emsp;|&emsp;
                        Size:&emsp;{item.size}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <span>&#8369;&nbsp;{item.price}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
            <Separator/>
            <div className="flex flex-row justify-end">
              <span className="text-xl font-semibold">ORDER SUMMARY</span>
            </div>
            <div className="flex flex-row items-center justify-end gap-x-10">
              <span className="text-lg">Subtotal</span>
              <span>&#8369;&nbsp;
                {order?.cartItems?.reduce((total: any, item: any) => {
                  return total + (item.price * item.quantity)
                },0)}
              </span>
            </div>
            <div className="flex flex-row items-center justify-end gap-x-10">
              <span className="text-lg">Total</span>
              <span>&#8369;&nbsp;
                {order?.cartItems?.reduce((total: any, item: any) => {
                  return total + (item.price * item.quantity)
                },0)}
              </span>
            </div>
            <Separator/>
            <span className="text-gray-500 text-sm">{order.additionalInfo}</span>
          </div>
        ))
        :
        <div className="flex justify-center mt-[20%]">
          <span className="text-2xl">No Orders Yet&emsp;{":(("}</span>
        </div>
      }
    </Wrapper>
  )
}

export default Orders;