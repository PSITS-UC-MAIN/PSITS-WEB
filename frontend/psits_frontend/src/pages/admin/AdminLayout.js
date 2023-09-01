import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminTopbar from "@/components/Topbar";
import AdminSidebar from "@/components/Sidebar";
import useStore from "@/store";
import { useEffect } from "react";
const AdminLayout = () => {
    const navigate = useNavigate();
    const store = useStore();
    useEffect(() => {
        if (!store.authUser?.isAdmin) {
            toast.error("You are not authorize to access that site.");
            navigate("/");
            return;
        }
    }, []);
    return (_jsxs("section", { className: "flex h-screen", children: [_jsx(AdminSidebar, {}), _jsxs("div", { className: "w-full", children: [_jsx(AdminTopbar, {}), _jsx("div", { className: "m-10", children: _jsx(Outlet, {}) })] })] }));
};
export default AdminLayout;
