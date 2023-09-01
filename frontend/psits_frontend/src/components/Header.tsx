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

const ROUTE = ["/admin", "/admin/accounts", "/admin/events", "/admin/merchandise"];

const Header = ({ data }: any) => {
  const { pathname } = useLocation();

  // hides the header in admin pages
  if (ROUTE.includes(pathname)) return;

  return (
    <>
      <div className="w-full h-[30px] mx-auto overflow-hidden flex justify-start bg-[#1A1A1A]">
        <motion.div
          className=" flex gap-20 items-center text-white"
          animate={{ x: -1394 }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="truncate flex gap-20 items-center">
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
          </div>
          <div className="truncate flex gap-20 items-center">
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
            <p className="font-semibold text-sm break-keep">BUY OUR MERCH</p>
            <span className="h-[5px] min-w-[5px] bg-white rounded-full" />
          </div>
        </motion.div>
      </div>

      <header className="sticky top-0 z-50">
        <nav className="bg-[#074873] w-full py-6 text-start">
          <div className="flex items-center justify-between text-white mx-10 xl:mx-[150px]">
            <Link to="/">
              <div className="flex items-center gap-4 cursor-pointer">
                <div className="max-h-[60px] max-w-[60px]">
                  <img src="/logo/psits_logo.png" className="max-w-[60px] max-h-[60px]" />
                </div>
                <h1 className="hidden sm:block font-semibold text-sm md:text-lg">
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
                    <NavigationMenuTrigger className="bg-transparent text-md"> Students </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-4 p-4 m-0 border bg-transparent w-[500px]">
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="hover:bg-slate-200">
                          <Link to="/students">All Students</Link>
                        </Button>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="hover:bg-slate-200">
                          <Link to="/students/officers">
                            <p>PSITS Officers</p>
                          </Link>
                        </Button>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" className="hover:bg-slate-200">
                          <Link to="/students/developers">Developers</Link>
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
              <Cart/>
              {data && data?.isAdmin ? (
                <>
                  <Button className="text-md" variant="ghost" asChild>
                    <Link to="/admin">Admin</Link>
                  </Button>
                  <Profile className="ml-4" />
                </>
              ) : data ? (
                <Profile className="ml-4" />
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
