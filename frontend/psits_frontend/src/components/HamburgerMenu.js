import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "./ui/navigation-menu";
const HamburgerMenu = () => {
    return (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "block lg:hidden", children: _jsx(Menu, {}) }) }), _jsx(SheetContent, { side: "right", children: _jsx(SheetHeader, { children: _jsxs("div", { className: "flex flex-col items-start", children: [_jsx(SheetClose, { asChild: true, children: _jsx(Button, { className: "text-md", variant: "ghost", asChild: true, children: _jsx(Link, { to: "/", children: "Home" }) }) }), _jsx(SheetClose, { asChild: true, children: _jsx(Button, { className: "text-md", variant: "ghost", asChild: true, children: _jsx(Link, { to: "/about", children: "About Us" }) }) }), _jsx(SheetClose, { asChild: true, children: _jsx(Button, { className: "text-md", variant: "ghost", asChild: true, children: _jsx(Link, { to: "/events", children: "Events" }) }) }), _jsx(NavigationMenu, { children: _jsx(NavigationMenuList, { children: _jsxs(NavigationMenuItem, { children: [_jsx(NavigationMenuTrigger, { className: "bg-transparent text-md", children: " Students " }), _jsxs(NavigationMenuContent, { className: "flex flex-col gap-4 p-4 m-0 border bg-transparent w-[500px]", children: [_jsx(NavigationMenuLink, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "hover:bg-slate-200", children: _jsx(SheetClose, { asChild: true, children: _jsx(Link, { to: "/students", children: "All Students" }) }) }) }), _jsx(NavigationMenuLink, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "hover:bg-slate-200", children: _jsx(SheetClose, { asChild: true, children: _jsx(Link, { to: "/students/officers", children: _jsx("p", { children: "PSITS Officers" }) }) }) }) }), _jsx(NavigationMenuLink, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "hover:bg-slate-200", children: _jsx(SheetClose, { asChild: true, children: _jsx(Link, { to: "/students/developers", children: "Developers" }) }) }) })] })] }) }) }), _jsx(SheetClose, { asChild: true, children: _jsx(Button, { className: "text-md", variant: "ghost", asChild: true, children: _jsx(Link, { to: "/merchandise", children: "Merchandise" }) }) })] }) }) })] }));
};
export default HamburgerMenu;