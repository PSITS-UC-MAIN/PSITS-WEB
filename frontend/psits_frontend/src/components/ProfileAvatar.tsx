import { Link, useNavigate } from "react-router-dom";
import { LogOut, Package2, ShieldAlert, User } from "lucide-react";

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
          <Avatar className="">
            <AvatarImage
              src={store.authUser?.avatar}
              alt="profile-avatar"
              className="rounded-full h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] object-cover hover:border-2 transition"
            />
            <AvatarFallback>
              <User className="rounded-full text-white"/>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/admin" className="flex items-center">
              <ShieldAlert className="mr-4 h-6 w-4" />
              <span className="text-red-400">Admin</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/profile" className="flex items-center">
              <User className="mr-4 h-6 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/orders" className="flex items-center">
              <Package2 className="mr-4 h-6 w-4" />
              <span>Orders</span>
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
