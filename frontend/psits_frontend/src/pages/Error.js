import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Wrapper from "@/components/Wrapper";
import { notfound } from "@/assets";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Error = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (_jsx(Wrapper, { title: "PSITS | Page Not Found", children: _jsxs("div", { className: "text-center flex items-center flex-col justify-center h-screen", children: [_jsx("img", { className: "md:max-w-[600px] block mb-8", src: notfound, alt: "not-found" }), _jsx("h3", { className: "text-xl md:text-3xl font-bold mb-4", children: "Ohh! Page Not Found" }), _jsx("p", { className: "text-gray-500 mb-2", children: "we can't seem to find the page you are looking for" }), _jsx(Link, { to: "/", className: "", children: _jsx(Button, { variant: "link", className: "text-[#074873] text-lg", children: "Back Home" }) })] }) }));
    }
    return (_jsx(Wrapper, { title: "PSITS | Page Not Found", children: _jsxs("div", { children: [_jsx("p", { children: "Something went wrong" }), _jsx(Link, { to: "/", children: "Back Home" })] }) }));
};
export default Error;
