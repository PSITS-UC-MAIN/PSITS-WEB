import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
const dummyData = [
    {
        user_id: 12345,
        firstname: "Darelle",
        lastname: "Gochuico",
        email: "gochuicodarelleq@gmail.com",
        course: "BSIT",
        year: "4",
        isAdmin: true,
    },
    {
        user_id: 12346,
        firstname: "Kean Jieden",
        lastname: "Villaflor",
        email: "keanjieden@gmail.com",
        course: "BSIT",
        year: "4",
        isAdmin: true,
    },
    {
        user_id: 12347,
        firstname: "Darelle",
        lastname: "Gochuico",
        email: "gochuicodarelleq@gmail.com",
        course: "BSIT",
        year: "4",
        isAdmin: true,
    },
    {
        user_id: 12348,
        firstname: "Kean Jieden",
        lastname: "Villaflor",
        email: "keanjieden@gmail.com",
        course: "BSIT",
        year: "4",
        isAdmin: true,
    },
    {
        user_id: 12349,
        firstname: "Darelle",
        lastname: "Gochuico",
        email: "gochuicodarelleq@gmail.com",
        course: "BSIT",
        year: "4",
        isAdmin: true,
    },
    {
        user_id: 12340,
        firstname: "Kean Jieden",
        lastname: "Villaflor",
        email: "keanjieden@gmail.com",
        course: "BSIT",
        year: "4",
        isAdmin: true,
    },
    {
        user_id: 12341,
        firstname: "Kean Jieden",
        lastname: "Villaflor",
        email: "keanjieden@gmail.com",
        course: "BSIT",
        year: "4",
        isAdmin: true,
    },
    {
        user_id: 12342,
        firstname: "Kean Jieden",
        lastname: "Villaflor",
        email: "keanjieden@gmail.com",
        course: "BSIT",
        year: "4",
        isAdmin: true,
    },
];
const Students = () => {
    return (_jsx(Wrapper, { title: "PSITS | Students", children: _jsxs("div", { className: "min-h-screen mt-10", children: [_jsx("div", { className: "flex justify-end", children: _jsxs("div", { className: "flex gap-x-3 w-[50%]", children: [_jsx(Input, { type: "search", placeholder: "Search for a student..." }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[20%]", children: _jsx(SelectValue, { placeholder: "Course" }) }), _jsx(SelectContent, { children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Course" }), _jsx(SelectItem, { value: "BSIT", children: "BSIT" }), _jsx(SelectItem, { value: "BSCS", children: "BSCS" })] }) })] }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[20%]", children: _jsx(SelectValue, { placeholder: "Year" }) }), _jsx(SelectContent, { children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Year" }), _jsx(SelectItem, { value: "1", children: "1" }), _jsx(SelectItem, { value: "2", children: "2" }), _jsx(SelectItem, { value: "3", children: "3" }), _jsx(SelectItem, { value: "4", children: "4" })] }) })] }), _jsxs(Button, { type: "submit", className: "bg-[#268EA7] hover:bg-[#3da7c2]", children: ["Search\u2003", _jsx(Search, {})] })] }) }), _jsx("div", { className: "flex justify-start my-5", children: _jsx("span", { className: "font-bold text-2xl", children: "Search Results" }) }), _jsx("div", { className: "flex gap-4 flex-wrap justify-center mb-10", children: dummyData.map((item) => (_jsxs(Card, { className: "w-[300px] text-center", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: _jsx("div", { className: "bg-gray-200 h-[200px] rounded" }) }) }), _jsxs(CardContent, { className: "uppercase", children: [_jsxs("h1", { className: "text-xl font-semibold", children: [item.firstname, "\u00A0", item.lastname] }), _jsxs("p", { className: "text-[#074873] font-medium", children: [item.course, " - ", item.year] })] })] }, item.user_id))) })] }) }));
};
export default Students;
