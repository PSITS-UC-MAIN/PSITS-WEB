import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { psits_banner2 } from "@/assets";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";

const dummyData = [
  {
    id: 1,
    title: "I GYATT something in my eye T-Shirt",
    price: 40,
    photo_img_link: psits_banner2,
    size: "S",
    color: "Red",
  },
  {
    id: 2,
    title: "I GYATT something in my eye T-Shirt",
    price: 40,
    photo_img_link: psits_banner2,
    size: "S",
    color: "Red",
  },
  {
    id: 3,
    title: "I GYATT something in my eye T-Shirt",
    price: 40,
    photo_img_link: psits_banner2,
    size: "S",
    color: "Red",
  },
  {
    id: 4,
    title: "I GYATT something in my eye T-Shirt",
    price: 40,
    photo_img_link: psits_banner2,
    size: "S",
    color: "Red",
  },
  {
    id: 5,
    title: "I GYATT something in my eye T-Shirt",
    price: 40,
    photo_img_link: psits_banner2,
    size: "S",
    color: "Red",
  },
];

const ROUTE = ["/admin", "/admin/accounts", "/admin/events", "/admin/merchandise"];

const Header = () => {
  const { pathname } = useLocation();

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let total = 0;
    dummyData.forEach((item) => (total += item.price));
    return total;
  };

  React.useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice);
  }, [dummyData]);

  if (ROUTE.includes(pathname)) return;

  return (
    <header className="sticky top-0 z-50">
      {/* <div className="px-20 my-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
              <img src="/logo/psits_logo.png" className="w-[130px] h-[130px]"/>
              <h1 className="text-3xl font-bold text-[#074873] uppercase">Philippine Society of Information <br/> Technology Students Main Portal</h1>
          </div>
      </div> */}
      <nav className="bg-[#074873] w-full py-6 text-start">
        <div className="flex items-center justify-between text-white mx-[150px]">
          <div className="flex items-center gap-4 cursor-pointer">
            <img src="/logo/psits_logo.png" className="h-[60px]" />
            <h1 className="text-lg font-semibold">
              Philippine Society of Information <br /> Technology Students
            </h1>
          </div>
          <div className="flex gap-4 items-center">
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
                  <span className="absolute top-[-5px] end-[-5px] bg-red-600 text-white font-bold rounded-full p-1 text-[15px] px-3">
                    8
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[70%] bg-[#f9f9f9]">
                <div className="flex flex-col mx-[3%]">
                  <div className="grid grid-cols-4 text-center bg-[#254872] text-white rounded-md shadow-md p-5 mt-5 mb-5">
                    <span>Product</span>
                    <span>Size</span>
                    <span>Color</span>
                    <span>Price</span>
                  </div>
                  <ScrollArea className="h-[30em] w-full rounded-md">
                    {dummyData.map((item) => (
                      <div key={item.id} className="grid grid-cols-4 bg-white rounded-md shadow-md p-5 items-center mb-5">
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
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex flex-row justify-end items-center gap-x-10 p-5">
                    <span className="bg-white rounded-md py-2 px-5 shadow-md">
                      Order Total:&emsp;&#8369;{totalPrice}
                    </span>
                    <Button type="submit" className="bg-[#268EA7] hover:bg-[#3da7c2]">
                      Checkout
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="text-md" variant="ghost" asChild>
              <Link to="/admin">Admin</Link>
            </Button>
            <Button className="text-md" variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
