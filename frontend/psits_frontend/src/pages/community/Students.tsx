import Wrapper from "@/components/Wrapper";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "@/api/user";
import { motion } from "framer-motion";
import { AlertCircle, Loader2Icon } from "lucide-react";

const Students = () => {
  const {
    data: students,
    isLoading,
    isError,
  } = useQuery(["users"], getAllUser, {
    select(studentsData) {
      const filteredStudents = studentsData.filter((student: any) => student.showPublic === true);
      return filteredStudents;
    },
  });

  return (
    <Wrapper title="PSITS | Students" className="my-20">
      {/* <div className="flex justify-end">
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
        </div> */}
      <div className="flex justify-start mb-10">
        <span className="font-bold text-4xl text-[#074873]">All Students</span>
      </div>
      {isLoading ? (
        <span className="text-center flex justify-center">
          <Loader2Icon className="animate-spin" />
        </span>
      ) : isError ? (
        <div className="flex items-center gap-2 text-red-500 justify-center">
          <AlertCircle />
          <p>Something went wrong!</p>
        </div>
      ) : (
        <div className="flex gap-6 flex-wrap justify-center">
          {students.map((student: any) => (
            <motion.div
              key={student._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="w-[300px] text-center shadow">
                <div className="p-2">
                  <div className="border rounded h-[250px] w-full justify-center flex items-center">
                    <img src={student.avatar} className="object-contain w-full h-full" />
                  </div>
                </div>
                <div className="flex flex-col px-4 pb-2">
                  <h1 className="text-xl font-semibold">
                    {student.firstname}&nbsp;{student.lastname}
                  </h1>
                  <p className="text-[#074873] text-lg">
                    {student.course} - {student.year}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default Students;
