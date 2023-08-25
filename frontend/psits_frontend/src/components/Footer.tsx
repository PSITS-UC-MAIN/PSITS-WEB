import { Facebook, Mail, Phone } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#074873] text-white py-20">
      <div className="grid grid-cols-3 justify-items-center mb-20">
        <div className="flex flex-col gap-y-3">
          <div className="font-semibold mb-2">CONTACT US</div>
          <div className="flex flex-row gap-x-2">
            <a href="https://www.facebook.com/PSITS.UCmain" target="_blank">
              <Facebook />
            </a>
            <span>PSITS.UCmain</span>
          </div>
          <div className="flex flex-row gap-x-2">
            <a href="https://www.facebook.com/PSITS.UCmain" target="_blank">
              <Mail />
            </a>
            <span>sampleemail@gmail.com</span>
          </div>
          <div className="flex flex-row gap-x-2">
            <a href="https://www.facebook.com/PSITS.UCmain" target="_blank">
              <Phone />
            </a>
            <span>+636969696969</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="font-semibold mb-2">OUR SERVICE</div>
          <ul className="list-disc ms-5">
            <li>ANNOUNCEMENTS</li>
            <li>EVENTS</li>
            <li>MERCHANDISE</li>
          </ul>
        </div>
        <div className="font-semibold text-center">
          <div className="text-2xl">PAGE VIEWS</div>
          NULL
        </div>
      </div>
      <div className="grid grid-rows-1 justify-items-center">
        PSITS&copy;2022 &#x2022; developed by PSITS OFFICERS and CO
      </div>
    </footer>
  );
};

export default Footer;
