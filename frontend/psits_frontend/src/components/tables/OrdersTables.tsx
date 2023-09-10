import { getAllOrders, updateOrder } from "@/api/order";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Loader2Icon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, SelectItem } from "../ui/select";
import useStore from "@/store";
import { toast } from "react-toastify";

const OrdersTable = () => {
  const store = useStore();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["order"],
    queryFn: getAllOrders,
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: (cart) => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError(error: any) {
      toast.error(error.response.cart.message || error.message, { position: "bottom-right" });
    },
  });

  const handleStatusSelect = (item: string, merchId: string) => {
    const userId = store.authUser?.userId || "";
    const data = {
      orderId: merchId,
      orderStatus: item,
    };

    updateMutate({ userId, data });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Additional Info</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <span className="text-center flex justify-center">
            <Loader2Icon className="animate-spin" />
          </span>
        ) : isError ? (
          <div className="flex items-center gap-2 text-red-500  justify-center">
            <AlertCircle />
            <p>Something went wrong!</p>
          </div>
        ) : (
          <TableBody>
            {data?.orders?.map((item: any) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="w-[260px] sm:w-[150px]">
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
                  <TableCell>{item.orderDate}</TableCell>
                  <TableCell>{item.additionalInfo == "" ? "No remark" : item.additionalInfo}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default OrdersTable;
