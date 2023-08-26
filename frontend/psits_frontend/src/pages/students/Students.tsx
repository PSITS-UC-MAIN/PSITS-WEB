import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dummyData = [
  {
    user_id: 12345,
    firstname: "Darelle",
    lastname: "Gochuico",
    email: "gochuicodarelleq@gmail.com",
    course: "BSIT",
    year: "4",
    isAdmin: true,
  },
  {
    user_id: 12346,
    firstname: "Kean Jieden",
    lastname: "Villaflor",
    email: "keanjieden@gmail.com",
    course: "BSIT",
    year: "4",
    isAdmin: true,
  },
  {
    user_id: 12347,
    firstname: "Darelle",
    lastname: "Gochuico",
    email: "gochuicodarelleq@gmail.com",
    course: "BSIT",
    year: "4",
    isAdmin: true,
  },
  {
    user_id: 12348,
    firstname: "Kean Jieden",
    lastname: "Villaflor",
    email: "keanjieden@gmail.com",
    course: "BSIT",
    year: "4",
    isAdmin: true,
  },
  {
    user_id: 12349,
    firstname: "Darelle",
    lastname: "Gochuico",
    email: "gochuicodarelleq@gmail.com",
    course: "BSIT",
    year: "4",
    isAdmin: true,
  },
  {
    user_id: 12340,
    firstname: "Kean Jieden",
    lastname: "Villaflor",
    email: "keanjieden@gmail.com",
    course: "BSIT",
    year: "4",
    isAdmin: true,
  },
  {
    user_id: 12341,
    firstname: "Kean Jieden",
    lastname: "Villaflor",
    email: "keanjieden@gmail.com",
    course: "BSIT",
    year: "4",
    isAdmin: true,
  },
  {
    user_id: 12342,
    firstname: "Kean Jieden",
    lastname: "Villaflor",
    email: "keanjieden@gmail.com",
    course: "BSIT",
    year: "4",
    isAdmin: true,
  },
];

const Students = () => {
  return (
    <Wrapper title="PSITS | Students">
      <div className="min-h-screen mt-10">
        <div className="flex justify-end">
          <div className="flex gap-x-3 w-[50%]">
            <Input type="search" placeholder="Search for a student..." />
            <Select>
              <SelectTrigger className="w-[20%]">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course</SelectLabel>
                  <SelectItem value="BSIT">BSIT</SelectItem>
                  <SelectItem value="BSCS">BSCS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[20%]">
                <SelectValue placeholder="Year" />
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
            <Button type="submit" className="bg-[#268EA7] hover:bg-[#3da7c2]">
              Search&emsp;
              <Search />
            </Button>
          </div>
        </div>
        <div className="flex justify-start my-5">
          <span className="font-bold text-2xl">Search Results</span>
        </div>
        <div className="flex gap-4 flex-wrap justify-center mb-10">
          {dummyData.map((item) => (
            <Card key={item.user_id} className="w-[300px] text-center">
              <CardHeader>
                <CardTitle>
                  <div className="bg-gray-200 h-[200px] rounded"></div>
                </CardTitle>
              </CardHeader>
              <CardContent className="uppercase">
                <h1 className="text-xl font-semibold">
                  {item.firstname}&nbsp;{item.lastname}
                </h1>
                <p className="text-[#074873] font-medium">
                  {item.course} - {item.year}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Students;
