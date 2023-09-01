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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useShoppingCart } from "./Context";
import Profile from "./ProfileAvatar";
import HamburgerMenu from "./HamburgerMenu";

const ROUTE = ["/admin", "/admin/accounts", "/admin/events", "/admin/merchandise"];

const Header = ({ data }: any) => {
  const { cartItems, getTotalPrice, removeFromCart, decreaseQuantity, increaseQuantity } = useShoppingCart();
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="relative">
                    <ShoppingCart color="#fff" />
                    <span
                      className={
                        Object.values(cartItems).length < 1
                          ? "absolute top-[-5px] end-[-5px] bg-red-600 text-white font-bold rounded-full p-1 text-[15px] px-3 hidden"
                          : "absolute top-[-5px] end-[-5px] bg-red-600 text-white font-bold rounded-full p-1 text-[15px] px-3"
                      }
                    >
                      {Object.values(cartItems).length}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[70%] bg-[#f9f9f9]">
                  <div className="flex flex-col mx-[3%]">
                    <div className="grid grid-cols-6 text-center bg-[#254872] text-white rounded-md shadow-md p-5 mt-5 mb-5">
                      <span>Product</span>
                      <span>Size</span>
                      <span>Color</span>
                      <span>Price</span>
                      <span>Quantity</span>
                      <span>Action</span>
                    </div>
                    <ScrollArea className="h-[30em] w-full rounded-md">
                      {Object.values(cartItems).map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-6 bg-white rounded-md shadow-md p-5 items-center mb-5"
                        >
                          <div className="flex flex-cols gap-x-5 items-center">
                            <img
                              src={item.photo_img_link}
                              alt="Product Image"
                              className="w-[100px] h-[100px] rounded-md"
                            />
                            <span>{item.title}</span>
                          </div>
                          <span className="text-center">{item.size}</span>
                          <span className="text-center">{item.color}</span>
                          <span className="text-center">&#8369;{item.price}</span>
                          <div className="grid grid-cols-3 items-center justify-items-center">
                            <Button
                              className="bg-[#268EA7] hover:bg-[#3da7c2]"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              -
                            </Button>
                            <span className="text-center">{item.quantity}</span>
                            <Button
                              className="bg-[#268EA7] hover:bg-[#3da7c2]"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              +
                            </Button>
                          </div>
                          <div className="flex flex-row justify-center">
                            <Button className="bg-red-600" onClick={() => removeFromCart(item.id)}>
                              <Trash size={20} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                    <div className="flex flex-row justify-end items-center gap-x-10 p-5">
                      <span className="bg-white rounded-md py-2 px-5 shadow-md">
                        Order Total:&emsp;&#8369;{getTotalPrice()}
                      </span>
                      <Button type="submit" className="bg-[#268EA7] hover:bg-[#3da7c2]">
                        Checkout
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
