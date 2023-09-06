import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAllUser } from "@/api/user";

const AccountsTable = () => {
  const { data, isLoading, isError } = useQuery(["users"], getAllUser, {
    select(userData) {
      return userData;
    },
  });

  if (isLoading) return <div>Loading...</div>;
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
          </TableRow>
        </TableHeader>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountsTable;
