import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAllMerchandise } from "@/api/merchandise";
import { AlertCircle, Loader2Icon } from "lucide-react";

const MerchandiseTable = () => {
  const { data, isLoading, isError } = useQuery(["merch"], getAllMerchandise, {
    select(merchData) {
      return merchData.merchandise;
    },
  });

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
        )}
      </Table>
    </div>
  );
};

export default MerchandiseTable;
