import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem, } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { logoutUser } from "@/api/auth";
import useStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
const Profile = ({ className }) => {
    const navigate = useNavigate();
    const store = useStore();
    const { refetch } = useQuery(["getCurrentUser"], logoutUser, {
        enabled: false,
        onSuccess(data) {
            store.setAuthUser(null);
            toast.success(data.message);
            store.setRequestLoading(false);
            navigate("/");
        },
        onError(error) {
            store.setRequestLoading(false);
            toast.error(error.message);
            console.log(error);
        },
    });
    const logoutHandler = () => {
        refetch();
    };
    return (_jsx("div", { className: className, children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx("div", { className: "cursor-pointer h-[50px] w-[50px]", children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "https://github.com/shadcn.png", alt: "@shadcn", className: "rounded-full hover:border-2 transition" }), _jsx(AvatarFallback, { children: _jsx(User, {}) })] }) }) }), _jsxs(DropdownMenuContent, { className: "w-40", children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: _jsxs(Link, { to: "/profile/6969", className: "flex items-center", children: [_jsx(User, { className: "mr-4 h-6 w-4" }), _jsx("span", { children: "Profile" })] }) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: logoutHandler, className: "flex items-center", children: [_jsx(LogOut, { className: " mr-4 h-6 w-4" }), _jsx("span", { children: "Logout" })] })] })] }) }));
};
export default Profile;
