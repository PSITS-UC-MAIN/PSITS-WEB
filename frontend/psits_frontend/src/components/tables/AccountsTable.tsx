import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAllUser } from "@/api/user";
import { AlertCircle, Loader2Icon } from "lucide-react";

const AccountsTable = () => {
  const { data, isLoading, isError } = useQuery(["users"], getAllUser, {
    select(userData) {
      return userData;
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of student accounts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>UserId</TableHead>
            <TableHead>RFID</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Year</TableHead>
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
            {data?.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>
                  <img src={user.avatar} className="w-[50px] h-[50px]" />
                </TableCell>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.rfid}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.course}</TableCell>
                <TableCell>{user.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default AccountsTable;
