import Wrapper from "@/components/Wrapper";
import { underconstruct } from "@/assets";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Maintenance = () => {
  return (
    <Wrapper title="PSITS | Page Under Contruction">
      <div>
        <div className="text-center flex items-center flex-col justify-center h-screen">
          <img className="md:max-w-[600px] block mb-8" src={underconstruct} alt="under-construction" />
          <h3 className="text-xl md:text-3xl font-bold mb-4">Ohh! Page is under construction.</h3>
          <p className="text-gray-500 mb-2">Devs are currently dokdok the page.</p>
          <Link to="/" className="">
            <Button variant="link" className="text-[#074873] text-lg">
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Maintenance;
