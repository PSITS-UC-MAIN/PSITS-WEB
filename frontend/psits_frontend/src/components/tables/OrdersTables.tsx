import { getAllOrders, updateOrder } from "@/api/order";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Loader2Icon, QrCodeIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, SelectItem } from "../ui/select";
import useStore from "@/store";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { useEffect, useState } from "react";
import Html5QrcodePlugin from "../plugins/Html5QrcodePlugin";
import { handleDateFormat } from "@/pages/Orders";
import { Users } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

interface RemarksState {
  [itemId: string]: string | undefined;
}

const OrdersTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["order"],
    queryFn: getAllOrders,
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: (cart) => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["order"]);
    },
    onError(error: any) {
      toast.error(error.response.cart.message || error.message, { position: "bottom-right" });
    },
  });
  
  const store = useStore();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false)
  const [remarks, setRemarks] = useState<RemarksState>({});
  const [orders, setOrders] = useState(data?.orders)

  const handleStatusSelect = (item: string, merchId: string) => {
    const userId = store.authUser?.userId || "";
    const data = {
      orderId: merchId,
      orderStatus: item,
    };

    updateMutate({ userId, data });
  };

  const onNewScanResult = (decodedText: any) => {
    const order = data?.orders.find((order: any) => order._id === decodedText);
    
    if (order) setOrders([order])

    setOpen(false)
  };

  const handleOrderTotal = (cartItems: any) => {
    return cartItems.reduce((accumulator: number, item: any) => {
      return accumulator + (parseInt(item.price) * item.quantity)
    }, 0)
  }
  
  const handleRemark = (itemId: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRemarks((prevRemarks) => ({
      ...prevRemarks,
      [itemId]: value === "" ? undefined : value,
    }));
  };

  const handleUpdateRemark = (itemId: string, remark: string | undefined) => {
    const userId = store.authUser?.userId || "";
    const data = {
      orderId: itemId,
      additionalInfo: remark || "",
    };

    updateMutate({ userId, data });
  }

  useEffect(() => {
    setOrders(data?.orders)
  }, [data])

  return (
    <div>
      <div className="flex mb-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <QrCodeIcon />&emsp;Scan QR Code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Html5QrcodePlugin
              className="mt-5"
              fps={30}
              qrbox={250}
              disableFlip={false}
              aspectRatio={1.0}
              qrCodeSuccessCallback={onNewScanResult}
            />
          </DialogContent>
        </Dialog>
        <Button variant="ghost" onClick={() => setOrders(data?.orders)}>
          <Users />&emsp;All Users
        </Button>
      </div>
      {
        isLoading ? (
          <span className="text-center flex justify-center">
            <Loader2Icon className="animate-spin" />
          </span>
        ) : isError ? (
          <div className="flex items-center gap-2 text-red-500  justify-center">
            <AlertCircle />
            <p>Something went wrong!</p>
          </div>
        ) : (
          <Table className="rounded-md border">
            <TableCaption>A list of orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Specification</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Remark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((item: any) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger className="w-[260px] sm:w-[150px]" disabled={item.orderStatus === "CLAIMED" || item.orderStatus === "CANCELLED"}>
                          <SelectValue defaultValue="ORDERED" placeholder={item.orderStatus} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem onMouseDown={() => handleStatusSelect("ORDERED", item._id)} value="ORDERED">
                              ORDERED
                            </SelectItem>
                            <SelectItem onMouseDown={() => handleStatusSelect("PENDING", item._id)} value="PENDING">
                              PENDING
                            </SelectItem>
                            <SelectItem onMouseDown={() => handleStatusSelect("CLAIMED", item._id)} value="CLAIMED">
                              CLAIMED
                            </SelectItem>
                            <SelectItem onMouseDown={() => handleStatusSelect("CANCELLED", item._id)} value="CANCELLED">
                              CANCELLED
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{handleDateFormat(item.orderDate, 0)}</TableCell>
                    <TableCell>
                      <ScrollArea>
                        { item?.cartItems?.map((cartItem: any) => <h1 key={cartItem._id}>{cartItem.quantity}x {cartItem.name}</h1>) }
                      </ScrollArea>
                    </TableCell>
                    <TableCell>
                      <ScrollArea>
                        { item?.cartItems?.map((cartItem: any) => <h1 key={cartItem._id}>{cartItem.color} | {cartItem.size}</h1>)}
                      </ScrollArea>
                    </TableCell>
                    <TableCell>
                      <ScrollArea>
                        &#8369; { handleOrderTotal(item?.cartItems) }
                      </ScrollArea>
                    </TableCell>
                    <TableCell>
                      <Textarea
                        key={item._id}
                        value={remarks[item._id] || item.additionalInfo}
                        onChange={handleRemark(item._id)}
                        onBlur={() => handleUpdateRemark(item._id, remarks[item._id])}
                        className="resize-none"
                        rows={3}
                        cols={10}
                        disabled={item.orderStatus === "CLAIMED" || item.orderStatus === "CANCELLED"}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
      )}
    </div>
  );
};

export default OrdersTable;