import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
// import { useQuery } from "@tanstack/react-query";
// import { AlertCircle, Loader2Icon } from "lucide-react";

const OrdersTable = () => {
  // const { data, isLoading, isError } = useQuery(["orders"], getAllOrders, {
  //   select(merchData: any) {
  //     return merchData.merchandise;
  //   },
  // });

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Additional Info</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableCell>test</TableCell>
        </TableBody>
        {/* {isLoading ? (
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
            {data?.map((merch: any) => {
              return (
                <TableRow key={merch._id}>
                  <TableCell>{merch.name}</TableCell>
                  <TableCell>{merch.description}</TableCell>
                  <TableCell>{merch.price}</TableCell>
                  <TableCell>{merch.stocks}</TableCell>
                  <TableCell>{merch.size}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )} */}
      </Table>
    </div>
  );
};

export default OrdersTable;
