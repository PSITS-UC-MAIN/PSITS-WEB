import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Tooltip, Area } from "recharts";
import Wrapper from "@/components/Wrapper";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
const data = [
    { name: "January", sales: 1000 },
    { name: "Febuary", sales: 4000 },
    { name: "March", sales: 2000 },
    { name: "April", sales: 5000 },
    { name: "May", sales: 10000 },
    { name: "June", sales: 15000 },
    { name: "July", sales: 5000 },
    { name: "August", sales: 20000 },
    { name: "September", sales: 5000 },
];
const AdminDashboard = () => {
    return (_jsx(Wrapper, { title: "PSITS Admin | Dashboard", noMargin: true, children: _jsxs("div", { className: " flex flex-col gap-10", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Card, { className: "max-w-[250px] bg-gradient-to-r from-blue-400 to-cyan-400", children: _jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: [_jsxs("div", { className: "flex items-center gap-2 text-white", children: [_jsx(User, { strokeWidth: 3 }), _jsx("span", { className: "text-xl text-white", children: "Total Earnings" })] }), _jsx(Separator, { className: "my-2" })] }), _jsx("div", { className: "flex text-white items-center gap-2 justify-start", children: _jsx("h1", { className: "text-3xl text-white font-semibold", children: "\u20B16969.00" }) })] }) }), _jsx(Card, { className: "max-w-[250px] bg-gradient-to-r from-orange-400 to-red-400", children: _jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: [_jsxs("div", { className: "flex items-center gap-2 text-white", children: [_jsx(User, { strokeWidth: 3 }), _jsx("span", { className: "text-xl text-white", children: "Total Students" })] }), _jsx(Separator, { className: "my-2" })] }), _jsx("div", { className: "flex text-white items-center gap-2 justify-start", children: _jsx("h1", { className: "text-3xl text-white font-semibold", children: "+ 699" }) })] }) }), _jsx(Card, { className: "max-w-[250px] bg-gradient-to-r from-purple-400 to-pink-400", children: _jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: [_jsxs("div", { className: "flex items-center gap-2 text-white", children: [_jsx(User, { strokeWidth: 3 }), _jsx("span", { className: "text-xl text-white", children: "Total Orders" })] }), _jsx(Separator, { className: "my-2" })] }), _jsx("div", { className: "flex text-white items-center gap-2 justify-start", children: _jsx("h1", { className: "text-3xl text-white font-semibold", children: "+ 20" }) })] }) })] }), _jsx(Card, { children: _jsxs(CardContent, { children: [_jsx("h1", { className: "mt-4 mb-2 text-2xl font-semibold text-", children: "Monthly Revenue" }), _jsx(Separator, {}), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { margin: { top: 20 }, data: data, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "total", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#8884d8", stopOpacity: 0.8 }), _jsx("stop", { offset: "95%", stopColor: "#8884d8", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, { allowDecimals: false }), _jsx(Tooltip, {}), _jsx(Area, { type: "monotone", dataKey: "sales", stroke: "#8884d8", fillOpacity: 1, fill: "url(#total)" })] }) })] }) })] }) }));
};
export default AdminDashboard;
