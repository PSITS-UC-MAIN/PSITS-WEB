import { Facebook, Mail, GithubIcon, MapIcon } from "lucide-react";
import { footer_about_us, footer_announcement, footer_collaborate, footer_help } from "@/assets";

const Footer = () => {
  return (
    <footer className="bg-[#074873] text-white py-20">
      <div className="md:block hidden">
        <div className="flex flex-col mt-10 md:flex-row">
          <div className="m-[auto]  w-[200px] h-[105px] md:h-[200px] md:ml-[5%] lg:ml-[15%] text-center">
            <div className="relative h-[80px] hidden md:block border-2 border-solid border-b-0 border-[#183548] rounded-t-xl">
              <img className="relative top-[-100px] w-[200px] h-[200px]" src={footer_about_us} />
            </div>
            <div className="relative left-0 w-[200px] overflow-hidden">
              <div className="w-[200px] h-[100px] bg-[#295471] p-2 border-2 border-solid md:border-t-0 border-[#183548]">
                <h3 className="font-bold">ABOUT US</h3>
                <p className="text-sm">Philippine Society of Information Technology Students</p>
              </div>
            </div>
          </div>
          <div className="m-[auto]  w-[200px] h-[105px] md:h-[200px] text-center">
            <div className="relative h-[80px] hidden md:block border-2 border-solid border-b-0 border-[#183548] rounded-t-xl">
              <img className="relative top-[-100px] w-[200px] h-[200px]" src={footer_announcement} />
            </div>
            <div className="relative left-0 w-[200px] overflow-hidden">
              <div className="w-[200px] h-[100px] bg-[#295471] p-2 border-2 border-solid md:border-t-0 border-[#183548]">
                <h3 className="font-bold">ANNOUNCEMENTS</h3>
                <p className="text-sm">Stay updated for an upcoming campus events</p>
              </div>
            </div>
          </div>
          <div className="m-[auto] w-[200px] h-[105px] md:h-[200px] text-center">
            <div className="relative h-[80px] hidden md:block border-2 border-solid border-b-0 border-[#183548] rounded-t-xl">
              <img className="relative top-[-100px] w-[200px] h-[200px]" src={footer_help} />
            </div>
            <div className="relative left-0 w-[200px] overflow-hidden">
              <div className="w-[200px] h-[100px] bg-[#295471] p-2 border-2 border-solid md:border-t-0 border-[#183548]">
                <h3 className="font-bold">CONTACT US</h3>
                <p className="text-sm">Any inquiries? Feel free to contact us via email or facebook</p>
              </div>
            </div>
          </div>
          <div className="m-[auto]  w-[200px] h-[105px] md:h-[200px] md:mr-[5%] lg:mr-[15%] text-center">
            <div className="relative h-[80px] hidden md:block border-2 border-solid border-b-0 border-[#183548] rounded-t-xl">
              <img className="relative top-[-100px] w-[200px] h-[200px]" src={footer_collaborate} />
            </div>
            <div className="relative left-0 w-[200px] overflow-hidden">
              <div className="w-[200px] h-[100px] bg-[#295471] p-2 border-2 border-solid md:border-t-0 border-[#183548]">
                <h3 className="font-bold">COLLABORATE</h3>
                <p className="text-sm">
                  Aspiring Full-Stack Developer? Collaborate with us on{" "}
                  <a className="underline" href="https://github.com/PSITS-UC-MAIN" target="_blank">
                    GitHub
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center mb-5 text-xs md:text-lg mt-0 md:mt-5">
        <div className="flex flex-col gap-y-3 mt-[-50px] md:mt-0">
          <div className="font-semibold mb-2 w-[100%] text-center">CONTACT US</div>
          <div className="flex flex-row gap-x-2">
            <a href="https://www.facebook.com/PSITS.UCmain" target="_blank">
              <Facebook />
            </a>
            <span>PSITS.UCmain</span>
          </div>
          <div className="flex flex-row gap-x-2">
            <a href="mailto:psits.ccsmain@gmail.com?subject=Inquiry" target="_blank">
              <Mail />
            </a>
            <span>psits.ccsmain@gmail.com</span>
          </div>
          <div className="flex flex-row gap-x-2">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=10.297387897574%2C123.89677913363"
              target="_blank"
            >
              <MapIcon />
            </a>
            <span>University of Cebu, Cebu City, Philippines</span>
          </div>
          <div
            className="flex flex-row gap-x-2 cursor-pointer"
            onClick={() => {
              window.location.href = "https://github.com/PSITS-UC-MAIN";
            }}
          >
            <a href="https://github.com/PSITS-UC-MAIN" target="_blank">
              <GithubIcon />
            </a>
            <span>Follow us on Github</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 mt-5 md:mt-0">
          <div className="font-semibold mb-2 text-center">OUR SERVICE</div>
          <ul className="list-disc ms-5">
            <li>ANNOUNCEMENTS</li>
            <li>EVENTS</li>
            <li>MERCHANDISE</li>
          </ul>
        </div>
        <div className="font-semibold text-center">
          <div className="text-lg md:text-2xl mt-5 md:mt-0">PAGE VIEWS</div>
          NULL
        </div>
      </div>
      <div className="grid grid-rows-1 justify-items-center text-xs md:text-lg">
        PSITS&copy;2023 &#x2022; developed by PSITS OFFICERS and CO
      </div>
    </footer>
  );
};

export default Footer;
