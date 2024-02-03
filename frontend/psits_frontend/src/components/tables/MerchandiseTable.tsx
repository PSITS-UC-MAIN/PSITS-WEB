import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { deleteMerchandiseItem, getAllMerchandise } from "@/api/merchandise";
import { AlertCircle, Loader2Icon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";
import MerchandiseUpdateCard from "../merchandise/MerchandiseUpdateCard";

const MerchandiseTable = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery(["merch"], getAllMerchandise, {
    select(merchData) {
      return merchData.merchandise;
    },
  });

  const { mutate: deleteMutate, reset: deleteReset, isLoading: deleteIsLoading } = useMutation({
    mutationFn: deleteMerchandiseItem,
    onSuccess: (merch: any) => {
      queryClient.invalidateQueries(["merch"])
      toast.success(`${merch.message}`, { position: "bottom-right" })
      deleteReset()
    },
    onError(error: any) {
      toast.error(error.response.merch.message || error.message, { position: "bottom-right" })
    }
  })

  return (
    <div>
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
        <Table className="rounded-md border">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sizes</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {data?.map((merch: any) => {
                return (
                  <TableRow key={merch._id}>
                    <TableCell>
                      <img src={merch?.images[0]?.image} alt={`An image of ${merch.name}`} className="w-[100px] h-[100px] rounded-md" />
                    </TableCell>
                    <TableCell>{merch.name}</TableCell>
                    <TableCell>{merch.description}</TableCell>
                    <TableCell>&#8369; {merch.price}</TableCell>
                    <TableCell>{merch.size}</TableCell>
                    <TableCell>{merch.color}</TableCell>
                    <TableCell>{merch.stocks}</TableCell>
                    <TableCell>
                      <div className="flex flex-row gap-x-2">
                        <MerchandiseUpdateCard key={merch._id.toString()} item={merch} />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              disabled={deleteIsLoading}
                            >
                              <Trash2 size={20} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the merchandise item and remove the data
                                from the server.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutate(merch._id)}
                                className="bg-[#D44848] hover:bg-[#7F2B2B]"
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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

export default MerchandiseTable;
