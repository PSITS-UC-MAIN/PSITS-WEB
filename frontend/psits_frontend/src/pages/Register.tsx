import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Wrapper from "@/components/Wrapper";

const registerValidation = z.object({
  userId: z.string().min(8).max(15),
  firstname: z.string(),
  lastname: z.string(),
  course: z.string(),
  year: z.number(),
  email: z.string(),
  password: z.string().min(6).max(30),
  confirmPassword: z.string().min(6).max(30),
})

const Register = () => {
  const form = useForm({
    resolver: zodResolver(registerValidation)
  })

  return (
    <Wrapper title="PSITS | Register">
      <div className="w-[80%] m-auto bg-white flex flex-col justify-center lg:w-[550px] min-h-screen">
        <form {...form}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl mb-2 text-center">Register</CardTitle>
              <CardDescription className="text-center">
                Fill out the form to register
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="id">Student ID</Label>
                <Input required id="id" type="text" placeholder="I.D. No." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstname">Firstname</Label>
                <Input required id="firstname" type="text" placeholder="Firstname"/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastname">Lastname</Label>
                <Input required id="lastname" type="text" placeholder="Lastname"/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course">Course</Label>
                <Select defaultValue="BSIT" id="course">
                  <SelectTrigger>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BSIT">BSIT</SelectItem>
                    <SelectItem value="BSCS">BSCS</SelectItem>
                    <SelectItem value="ACT">ACT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Year</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input required id="password" type="password" placeholder="Password"/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="conformpassword">Confirm Password</Label>
                <Input required id="confirmpassword" type="password" placeholder="Confirm Password"/>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full bg-[#268EA7] hover:bg-[#3da7c2]">Register</Button>
              <Link to="/login">
                <p className="mt-2 text-xs text-center text-gray-700">
                  {" "}
                  Already have an account?{" "}
                  <span className=" text-blue-600 hover:underline">Log In</span>
                </p>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Wrapper>
  )
}

export default Register