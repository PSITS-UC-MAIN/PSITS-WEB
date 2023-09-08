import { footer_about_us, footer_announcement, footer_collaborate, footer_help } from "@/assets";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#074873] text-white pb-4 py-[100px]">
      <div className="flex justify-center items-center gap-20 flex-wrap">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="cursor-pointer w-[200px] text-center"
        >
          <Link to="/">
            <div className="h-[80px] border-2 border-b-0 border-[#183548] rounded-t-xl">
              <img className="relative top-[-100px] w-full" src={footer_announcement} />
            </div>

            <div className="w-[200px] bg-[#295471] p-2 border-2 border-solid md:border-t-0 border-[#183548]">
              <h3 className="font-bold">ANNOUNCEMENTS</h3>
              <p className="text-sm">Stay updated for an upcoming campus events</p>
            </div>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="cursor-pointer w-[200px] text-center"
        >
          <Link to="/about">
            <div className="h-[80px] border-2 border-b-0 border-[#183548] rounded-t-xl">
              <img className="relative top-[-100px] w-[200px] h-[200px]" src={footer_about_us} />
            </div>
            <div className="w-[200px] bg-[#295471] p-2 border-2 border-solid md:border-t-0 border-[#183548]">
              <h3 className="font-bold">ABOUT US</h3>
              <p className="text-sm">Philippine Society of Information Technology Students</p>
            </div>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="cursor-pointer w-[200px] text-center"
        >
          <a href="https://www.facebook.com/PSITS.UCmain" target="_blank">
            <div className="h-[80px] border-2 border-b-0 border-[#183548] rounded-t-xl">
              <img className="relative top-[-100px] w-[200px] h-[200px]" src={footer_help} />
            </div>
            <div className="w-[200px] bg-[#295471] p-2 border-2 border-solid md:border-t-0 border-[#183548]">
              <h3 className="font-bold">CONTACT US</h3>
              <p className="text-sm">Any inquiries? Feel free to contact us via email or facebook</p>
            </div>
          </a>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="cursor-pointer w-[200px] text-center"
        >
          <a href="https://github.com/PSITS-UC-MAIN" target="_blank">
            <div className="h-[80px] border-2 border-b-0 border-[#183548] rounded-t-xl">
              <img className="relative top-[-100px] w-[200px] h-[200px]" src={footer_collaborate} />
            </div>
            <div className="w-[200px] bg-[#295471] p-2 border-2 border-solid md:border-t-0 border-[#183548]">
              <h3 className="font-bold">COLLABORATE</h3>
              <p className="text-sm"> Aspiring Full-Stack Developer? Collaborate with us on GitHub</p>
            </div>
          </a>
        </motion.div>
      </div>
      <Separator className="my-4" />
      <div className="text-center font-bold text-sm">&copy; PSITS Dev {new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;
