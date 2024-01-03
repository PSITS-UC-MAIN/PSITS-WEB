import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Loader2Icon } from "lucide-react";
import { format, parseISO, addDays } from "date-fns";
import { useState } from "react";

import { getAllOrders, updateOrder } from "@/api/order";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, SelectItem } from "../ui/select";
import useStore from "@/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

const OrdersTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const store = useStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", search, page],
    queryFn: () => getAllOrders(search, page),
  }); 

  const searchOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value)
  }

  let totalPages = Math.ceil(data?.total / data?.limit);

  const handlePrevPage = () => {
    if (page > 1) setPage(page => page - 1);
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage(page => page + 1);
  }

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
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
    <>
      <Input value={search} className="w-[300px] mb-4" placeholder="Search any order by id..." onChange={searchOnChangeHandler}/>
      <Table className="rounded-md border">
        <TableCaption>A list of orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Additional Info</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <p className="text-center flex justify-center">
            <Loader2Icon className="animate-spin" />
          </p>
        ) : isError ? (
          <div className="flex items-center gap-2 text-red-500  justify-center">
            <AlertCircle />
            <p>Something went wrong!</p>
          </div>
        ) : (
          <TableBody>
            {data?.orders?.map((item: any) => {
              const formattedOrderDate = format(addDays(parseISO(item.orderDate), 0), "PP");
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.orderId}</TableCell>
                  <TableCell>{item.userId.userId}</TableCell>
                  <TableCell>{item.userId.firstname + " " + item.userId.lastname}</TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="w-[260px] sm:w-[150px]">
                        <SelectValue defaultValue={item.orderStatus} placeholder={item.orderStatus} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
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
                  <TableCell>{formattedOrderDate}</TableCell>
                  <TableCell>{item.additionalInfo == "" ? "No remark" : item.additionalInfo}</TableCell>
                  <TableCell>
                    <Button>View Order</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
      <Pagination className="my-5" >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>
          {
            totalPages > 0 && [...Array(totalPages)].map((val, index) => (
              <PaginationItem key={index}>
              <PaginationLink onClick={() => setPage(index + 1)} isActive={page === index + 1}>{index + 1}</PaginationLink>
            </PaginationItem>
            )) 
          }
          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default OrdersTable;
