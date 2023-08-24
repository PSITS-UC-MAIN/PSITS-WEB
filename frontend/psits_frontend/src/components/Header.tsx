import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          <div className="flex items-center gap-4">
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
            <Button className="text-md" variant="ghost" asChild>
              <Link to="/students">Students</Link>
            </Button>
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
