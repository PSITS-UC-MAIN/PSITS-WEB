import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { User, CalendarDays, ShoppingBasket, PanelLeft, BarChartBig } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const AdminSidebar = () => {
    const { pathname } = useLocation();
    return (_jsx(Sidebar, { width: "300px", children: _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex flex-col items-center gap-2 mb-12", children: [_jsx("img", { src: "/logo/psits_logo.png", className: "w-[150px]", placeholder: "logo" }), _jsx("h1", { className: "font-bold text-[#252525] text-2xl", children: "Admin Page" })] }), _jsxs(Menu, { menuItemStyles: {
                        button: ({ active }) => {
                            return {
                                color: active ? "#454545" : "",
                                fontWeight: active ? "600" : "",
                                borderRadius: "2px",
                            };
                        },
                    }, rootStyles: {
                        [`.${menuClasses.icon}`]: {
                            color: "#000000",
                        },
                        [`.${menuClasses.menuItemRoot}`]: {
                            color: "#526D82",
                            fontSize: "16px",
                        },
                    }, children: [_jsx("p", { className: " font-medium text-sm", children: "Main" }), _jsx(MenuItem, { active: pathname === "/admin" ? true : false, icon: _jsx(BarChartBig, {}), component: _jsx(Link, { to: "/admin" }), children: "Dashboard" }), _jsx(MenuItem, { active: pathname === "/admin/accounts" ? true : false, icon: _jsx(User, {}), component: _jsx(Link, { to: "/admin/accounts" }), children: "Accounts" }), _jsx(MenuItem, { active: pathname === "/admin/events" ? true : false, icon: _jsx(CalendarDays, {}), component: _jsx(Link, { to: "/admin/events" }), children: "Events" }), _jsx(MenuItem, { active: pathname === "/admin/merchandise" ? true : false, icon: _jsx(ShoppingBasket, {}), component: _jsx(Link, { to: "/admin/merchandise" }), children: "Merchandise" }), _jsx(Separator, { className: "my-4" }), _jsx(MenuItem, { icon: _jsx(PanelLeft, {}), component: _jsx(Link, { to: "/" }), children: "Exit" })] })] }) }));
};
export default AdminSidebar;
