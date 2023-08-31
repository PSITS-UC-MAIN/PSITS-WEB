import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  return (
    <Wrapper title="PSITS | Profile" noMargin>
      <div className="flex flex-col my-20 gap-y-10 mx-[30%]">
        <div className="flex justify-center">
          <span className="font-bold text-2xl">Edit Profile</span>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-200 h-[150px] w-[150px] rounded-full border-2 border-[#ccc] relative">
            <Label htmlFor="img">
              <Pencil
                className="bg-[#268EA7] hover:bg-[#3da7c2] w-[40px] h-[40px] rounded-full absolute bottom-0 end-0 border-2 border-white p-2"
                color="#fff"
              />
            </Label>
            <Input type="file" className="hidden" id="img" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-10 gap-x-5 mt-10">
          <div className="flex flex-col gap-y-3">
            <Label className="text-gray-500">First Name</Label>
            <Input autoComplete="off" id="firstname" placeholder="Enter your firstname" className="w-full"></Input>
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="text-gray-500">Last Name</Label>
            <Input autoComplete="off" id="lastname" placeholder="Enter your lastname"></Input>
          </div>
          <div className="col-span-2 flex flex-col gap-y-3">
            <Label className="text-gray-500">E-mail</Label>
            <Input autoComplete="off" id="email" placeholder="Enter your e-mail"></Input>
          </div>
          <div className="col-span-2 flex flex-col gap-y-3">
            <Label className="text-gray-500">Password</Label>
            <Input autoComplete="off" id="email" placeholder="Enter a new password"></Input>
          </div>
          <div>
            <Label className="text-gray-500">Course</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course</SelectLabel>
                  <SelectItem value="bsit">BSIT</SelectItem>
                  <SelectItem value="bscs">BSCS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-500">Year</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="bg-[#268EA7] hover:bg-[#3da7c2] w-[200px]">
          Save Changes
        </Button>
      </div>
    </Wrapper>
  );
};

export default Profile;
