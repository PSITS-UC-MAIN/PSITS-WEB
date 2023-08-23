import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Facebook } from "lucide-react";


const Header = () => {
  return (
    <header className=" ">
        <div className="px-20 my-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img src="logo/psits_logo.png" className="w-[130px] h-[130px]"/>
                <h1 className="text-3xl font-bold text-[#074873] uppercase">Philippine Society of Information <br/> Technology Students Main Portal</h1>
            </div>
            <div className="flex gap-4">
                <Button className="text-md" variant="link">
                    <a href="https://www.facebook.com/PSITS.UCmain" target="_blank">
                        <Facebook />
                    </a>
                </Button>
            </div>
        </div>
        <div className="bg-[#074873] w-full py-2 px-20 flex items-center text-white uppercase justify-between"> 
            <div className="py-4 flex gap-4">
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
            <div>
                <Button className="text-md" variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                </Button>
            </div>
        </div>
    </header>
  )
}

export default Header