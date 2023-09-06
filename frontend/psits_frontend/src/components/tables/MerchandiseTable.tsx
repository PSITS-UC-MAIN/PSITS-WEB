import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAllMerchandise } from "@/api/merchandise";

const MerchandiseTable = () => {
  const { data, isLoading, isError } = useQuery(["admerch"], getAllMerchandise, {
    select(merchData) {
      return merchData.merchandise;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of merchandise.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stocks</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>
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
      </Table>
    </div>
  );
};

export default MerchandiseTable;
