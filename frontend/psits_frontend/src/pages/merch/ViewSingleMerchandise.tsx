import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ViewSingleMerchandise = () => {
  return (
    <Wrapper title="PSITS | Merch Title" className="my-20">
      <div className="flex gap-20">
        <div className="h-[600px] w-[1000px]">
          <div className="w-full h-full bg-slate-400 rounded" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h3>Category</h3>
          <h1 className="text-6xl font-semibold">Title</h1>
          <p className="font-medium text-lg text-red-500 ">₱82.00</p>
          <Separator />
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum."
          </p>
          <div className="flex flex-col gap-2 mb-2">
            <p className="">Size: M</p>
            <div className="flex items-center gap-2">
              <Button>S</Button>
              <Button>M</Button>
              <Button>L</Button>
              <Button>XL</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <p className="">Color: Black</p>
            <div className="flex items-center gap-2">
              <div className="h-[50px] w-[50px] border border-gray-500 bg-slate-300" />
              <div className="h-[50px] w-[50px] border border-gray-500 bg-slate-300" />
              <div className="h-[50px] w-[50px] border border-gray-500 bg-slate-300" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <p className="">Quantity:</p>
            <div className="flex items-center">
              <Button variant="ghost">-</Button>
              <span>1</span>
              <Button variant="ghost">+</Button>
            </div>
          </div>
          <Button className="w-[40%] bg-[#268EA7] hover:bg-[#3da7c2] py-6">Add to cart</Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ViewSingleMerchandise;
