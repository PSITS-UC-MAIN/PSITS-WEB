import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const OrdersTable = () => {
//   const { data, isLoading, isError } = useQuery(["adorders"], getAllMerchandise, {
//     select(merchData) {
//       return merchData.merchandise;
//     },
//   });

//   if (isLoading) return <div>Loading...</div>;

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
          {/* {data?.map((merch: any) => {
            return (
              <TableRow key={merch._id}>
                <TableCell>{merch.name}</TableCell>
                <TableCell>{merch.description}</TableCell>
                <TableCell>{merch.price}</TableCell>
                <TableCell>{merch.stocks}</TableCell>
                <TableCell>{merch.size}</TableCell>
              </TableRow>
            );
          })} */}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
