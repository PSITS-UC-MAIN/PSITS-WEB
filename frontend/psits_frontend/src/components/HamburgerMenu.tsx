import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const HamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="block lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <div className="flex flex-col items-start">
            <SheetClose asChild>
              <Button className="text-md" variant="ghost" asChild>
                <Link to="/">Home</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="text-md" variant="ghost" asChild>
                <Link to="/about">About Us</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="text-md" variant="ghost" asChild>
                <Link to="/events">Events</Link>
              </Button>
            </SheetClose>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-md"> Students </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col gap-4 p-4 m-0 border bg-transparent w-[200px] sm:w-[500px]">
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" className="hover:bg-slate-200">
                        <SheetClose asChild>
                          <Link to="/community">All Students</Link>
                        </SheetClose>
                      </Button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" className="hover:bg-slate-200">
                        <SheetClose asChild>
                          <Link to="/community/faculty">Falculty Members</Link>
                        </SheetClose>
                      </Button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" className="hover:bg-slate-200">
                        <SheetClose asChild>
                          <Link to="/community/officers">
                            <p>PSITS Officers</p>
                          </Link>
                        </SheetClose>
                      </Button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Button variant="ghost" className="hover:bg-slate-200">
                        <SheetClose asChild>
                          <Link to="/community/developers">Developers</Link>
                        </SheetClose>
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <SheetClose asChild>
              <Button className="text-md" variant="ghost" asChild>
                <Link to="/merchandise">Merchandise</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
