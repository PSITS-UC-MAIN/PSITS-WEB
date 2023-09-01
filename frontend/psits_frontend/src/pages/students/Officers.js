import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Wrapper from "@/components/Wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const dummyData = [
    {
        id: 2323,
        name: "Kean Jieden Villaflor",
        position: "Volunteer",
    },
    {
        id: 2324,
        name: "Darelle Gochuico",
        position: "Volunteer",
    },
    {
        id: 2325,
        name: "Kean Jieden Villaflor",
        position: "Volunteer",
    },
    {
        id: 2326,
        name: "Darelle Gochuico",
        position: "Volunteer",
    },
    {
        id: 2327,
        name: "Kean Jieden Villaflor",
        position: "Volunteer",
    },
    {
        id: 2328,
        name: "Darelle Gochuico",
        position: "Volunteer",
    },
];
const Officers = () => {
    return (_jsx(Wrapper, { title: "PSTIS | Officers", children: _jsxs("div", { className: "m-20", children: [_jsx("h1", { className: "text-4xl font-medium mb-4 text-[#074873]", children: "PSITS OFFICERS" }), _jsx("div", { className: "flex gap-4 flex-wrap justify-center", children: dummyData.map((data) => {
                        return (_jsxs(Card, { className: "w-[300px] text-center", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: _jsx("div", { className: "bg-gray-200 h-[200px] rounded" }) }) }), _jsxs(CardContent, { className: "uppercase", children: [_jsx("h1", { className: "text-xl font-semibold", children: data.name }), _jsx("p", { className: "text-[#074873] font-medium", children: data.position })] })] }, data.id));
                    }) })] }) }));
};
export default Officers;
