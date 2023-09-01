import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Facebook, Mail, Phone } from "lucide-react";
const Footer = () => {
    return (_jsxs("footer", { className: "bg-[#074873] text-white py-20", children: [_jsxs("div", { className: "grid grid-cols-3 justify-items-center mb-20", children: [_jsxs("div", { className: "flex flex-col gap-y-3", children: [_jsx("div", { className: "font-semibold mb-2", children: "CONTACT US" }), _jsxs("div", { className: "flex flex-row gap-x-2", children: [_jsx("a", { href: "https://www.facebook.com/PSITS.UCmain", target: "_blank", children: _jsx(Facebook, {}) }), _jsx("span", { children: "PSITS.UCmain" })] }), _jsxs("div", { className: "flex flex-row gap-x-2", children: [_jsx("a", { href: "https://www.facebook.com/PSITS.UCmain", target: "_blank", children: _jsx(Mail, {}) }), _jsx("span", { children: "sampleemail@gmail.com" })] }), _jsxs("div", { className: "flex flex-row gap-x-2", children: [_jsx("a", { href: "https://www.facebook.com/PSITS.UCmain", target: "_blank", children: _jsx(Phone, {}) }), _jsx("span", { children: "+636969696969" })] })] }), _jsxs("div", { className: "flex flex-col gap-y-3", children: [_jsx("div", { className: "font-semibold mb-2", children: "OUR SERVICE" }), _jsxs("ul", { className: "list-disc ms-5", children: [_jsx("li", { children: "ANNOUNCEMENTS" }), _jsx("li", { children: "EVENTS" }), _jsx("li", { children: "MERCHANDISE" })] })] }), _jsxs("div", { className: "font-semibold text-center", children: [_jsx("div", { className: "text-2xl", children: "PAGE VIEWS" }), "NULL"] })] }), _jsx("div", { className: "grid grid-rows-1 justify-items-center", children: "PSITS\u00A92022 \u2022 developed by PSITS OFFICERS and CO" })] }));
};
export default Footer;
