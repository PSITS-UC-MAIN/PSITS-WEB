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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Wrapper from "@/components/Wrapper";

const loginValidation = z.object({
  userId: z.string().min(8).max(15),
  password: z.string().min(6).max(30)
})

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginValidation)
  })

  return (
    <Wrapper title="PSITS | Login">
      <main className="mt-28 w-[80%] m-auto bg-white lg:w-[550px]">
        <form {...form}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Log in</CardTitle>
              <CardDescription className="text-center">
                Enter your id no. and password to login
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="id">Student ID</Label>
                <Input id="id" placeholder="I.D. No." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Password"/>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                  Remember me
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-[#268EA7] hover:bg-[#3da7c2]">Login</Button>
              <Link to="/register">
                <p className="mt-2 text-xs text-center text-gray-700">
                  {" "}
                  Don't have an account yet?{" "}
                  <span className=" text-blue-600 hover:underline">Register</span>
                </p>
              </Link>
              <Link to="/resetpassword">
                <p className="mt-2 text-xs text-center text-gray-700">
                  {" "}
                  Forgot password?{" "}
                  <span className=" text-blue-600 hover:underline">Reset Password</span>
                </p>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </main>
    </Wrapper>
  )
}

export default Login