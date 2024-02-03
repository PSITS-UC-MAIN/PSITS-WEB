import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Loader2Icon} from "lucide-react";
import { getAllOrders, updateOrder } from "@/api/order";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { QrCodeIcon } from "lucide-react";
import useStore from "@/store";
import { useEffect, useState } from "react";
import { handleDateFormat } from "@/pages/Orders";
import { ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Html5QrcodePlugin from "@/components/plugins/Html5QrcodePlugin";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { ChangeEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "../ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import ViewOrderModal from "../order/ViewOrderModal";

interface RemarksState {
  [itemId: string]: string | undefined;
}

const OrdersTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const store = useStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", search, page],
    queryFn: () => getAllOrders(search, page),
  });

  const searchOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  let totalPages = Math.ceil(data?.total / data?.limit);

  const handlePrevPage = () => {
    if (page > 1) setPage((page) => page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((page) => page + 1);
  };

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["order"]);
    },
    onError(error: any) {
      toast.error(error.response.cart.message || error.message, { position: "bottom-right" });
    },
  });
  
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
  
  const handleRemark = (itemId: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          <ScrollText />&emsp;All Orders
        </Button>
        <Input
          value={search}
          className="w-[300px] mb-4"
          placeholder="Search any order by id or status..."
          onChange={searchOnChangeHandler}
        />
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
          <ScrollArea className="h-[60vh] w-full">
            <Table className="rounded-md border">
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
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
                      <TableCell>{item.userId.userId}</TableCell>
                      <TableCell>{item.userId.firstname + " " + item.userId.lastname}</TableCell>
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
          </ScrollArea>
      )}
      <Pagination className="my-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>
          {totalPages > 0 &&
            [...Array(totalPages)].map((val, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => setPage(index + 1)} isActive={page === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default OrdersTable;