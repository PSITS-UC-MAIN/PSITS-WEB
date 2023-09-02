import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { logoutUser } from "@/api/auth";
import useStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Profile = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const store = useStore();

  const { refetch } = useQuery(["getCurrentUser"], logoutUser, {
    enabled: false,
    onSuccess(data: any) {
      store.setAuthUser(null);
      toast.success(data.message);
      store.setRequestLoading(false);
      navigate("/");
    },
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.message);
      console.log(error);
    },
  });

  const logoutHandler = () => {
    refetch();
  };
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer h-[50px] w-[50px]">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="rounded-full hover:border-2 transition"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={`/profile/${store.authUser?.userId}`} className="flex items-center">
              <User className="mr-4 h-6 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logoutHandler} className="flex items-center">
            <LogOut className=" mr-4 h-6 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
