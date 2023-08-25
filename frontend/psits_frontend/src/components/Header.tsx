import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
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
            <h1 className="text-lg font-semibold ">
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
