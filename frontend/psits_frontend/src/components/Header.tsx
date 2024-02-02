import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Profile from "./ProfileAvatar";
import HamburgerMenu from "./HamburgerMenu";
import Cart from "./cart/Cart";
import useStore from "@/store";

const ROUTE = [
  "/admin",
  "/admin/accounts",
  "/admin/events",
  "/admin/merchandise",
  "/admin/orders",
  "/admin/announcements",
  "/admin/routes",
];

const handleGenerateRunningText = (n: number) => {
  const generateRunningText = Array.from({ length: n }, (_, index) => (
    <div className="truncate flex gap-20 items-center" key={n + index}>
      <Link to="/merchandise" className="text-[12px] font-bold">
        BUY OUR MERCH
      </Link>
      <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
      <Link to="https://www.facebook.com/PSITS.UCmain" target="_blank" className="text-[12px] font-bold">
        VISIT OUR FB PAGE
      </Link>
      <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
    </div>
  ));
  return generateRunningText;
};

const Header = () => {
  const { pathname } = useLocation();
  const { authUser } = useStore();

  // hides the header in admin pages
  if (ROUTE.includes(pathname)) return;

  return (
    <>
      <div className="w-full h-[40px] mx-auto overflow-hidden flex justify-start bg-[#1A1A1A]">
        <motion.div
          className=" flex gap-20 items-center text-white"
          animate={{ x: -1430 }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {handleGenerateRunningText(6)}
        </motion.div>
      </div>

      <header className="sticky top-0 z-50">
        <nav className="bg-[#074873] w-full sm:py-6 py-4 text-start">
          <div className="flex items-center justify-between text-white mx-4 xl:mx-[150px]">
            <Link to="/">
              <div className="flex items-center gap-4 cursor-pointer">
                <div className="w-[40px] h-[40px] sm:h-[60px] sm:w-[60px]">
                  <img src="/logo/psits_logo.png" className="w-full h-full object-contain" />
                </div>
                <span className="sm:hidden font-medium">UC Main - PSITS</span>
                <h1 className="hidden sm:block font-semibold sm:max:md:text-sm lg:text-md 2xl:text-lg">
                  Philippine Society of Information <br /> Technology Students
                </h1>
              </div>
            </Link>
            <div className="hidden gap-4 items-center lg:flex">
              <Button className="text-md" variant="ghost" asChild>
                <Link to="/">Home</Link>
              </Button>
              <Button className="text-md" variant="ghost" asChild>
                <Link to="/about">About Us</Link>
              </Button>
              <Button className="text-md" variant="ghost" asChild>
                <Link to="/events">Events</Link>
              </Button>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-md"> Community </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-4 p-4 m-0 border bg-transparent w-[500px]">
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="hover:bg-slate-200">
                          <Link to="/community">All Students</Link>
                        </Button>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="hover:bg-slate-200">
                          <Link to="/community/faculty">Faculty Members</Link>
                        </Button>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="hover:bg-slate-200">
                          <Link to="/community/officers">
                            <p>PSITS Officers</p>
                          </Link>
                        </Button>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="hover:bg-slate-200">
                          <Link to="/community/developers">Developers</Link>
                        </Button>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Button className="text-md" variant="ghost" asChild>
                <Link to="/merchandise">Merchandise</Link>
              </Button>
            </div>
            <div className="flex gap-4 items-center">
              {authUser ? (
                <>
                  <Cart />
                  <Profile className="sm:ml-4 flex items-center" />
                </>
              ) : (
                <Button className="text-md" variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
              <HamburgerMenu />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
