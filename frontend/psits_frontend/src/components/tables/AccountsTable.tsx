import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Loader2Icon } from "lucide-react";
import { toast } from "react-toastify";

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAllUser, updateUserbyId } from "@/api/user";
import useStore from "@/store";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";


const AccountsTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const {authUser} = useStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(["users", search, page], () => getAllUser(search, page), {
    select(userData) {
      return userData;
    },
  });

  let totalPages = Math.ceil(data?.total / data?.limit) || 0;

  const searchOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage(page => page - 1);
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage(page => page + 1);
  }

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateUserbyId,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError(error: any) {
      toast.error(error.response.cart.message || error.message, { position: "bottom-right" });
    },
  });

  const handleRoleSelect = (role: string, userId: string) => {
    const data = {
      role: role,
    };

    updateMutate({ userId, data });
  };

  return (
    <>
    <Input value={search} className="w-[300px] mb-4" placeholder="Search any user here..." onChange={searchOnChangeHandler}/>
    <div className="rounded-md border">
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
        <Table>
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
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {data.users?.map((user: any) => {
                const role = user.role.charAt(0).toUpperCase() + user.role.slice(1);
                return (
                  <TableRow key={user._id}>
                    <TableCell>
                      <img src={user.avatar} className="w-[50px] h-[50px] object-cover rounded-full" />
                    </TableCell>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.rfid}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.course}</TableCell>
                    <TableCell>{user.year}</TableCell>
                    <TableCell>
                      {authUser?.role == "dev" ? (<Select>
                        <SelectTrigger className="">
                          <SelectValue defaultValue={user.role} placeholder={role} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem onMouseDown={() => handleRoleSelect("dev", user.userId)} value="dev">
                              Dev
                            </SelectItem>
                            <SelectItem onMouseDown={() => handleRoleSelect("admin", user.userId)} value="admin">
                              Admin
                            </SelectItem>
                            <SelectItem onMouseDown={() => handleRoleSelect("user", user.userId)} value="user">
                              User
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>) : role}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
        </Table>
      )}
    </div>
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

export default AccountsTable;
