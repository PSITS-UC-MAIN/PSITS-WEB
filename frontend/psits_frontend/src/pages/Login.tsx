import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Wrapper from "@/components/Wrapper";

const LoginSchema = z.object({
  userId: z.string().min(8).max(15),
  password: z.string().min(6).max(30),
});

type LoginSchema = z.infer<typeof LoginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    //TODO: Send data to the server
    console.log(data);
  };

  return (
    <Wrapper title="PSITS | Login">
      <div className="w-[80%] m-auto bg-white flex flex-col justify-center lg:w-[550px] min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl mb-2 text-center">Log In</CardTitle>
              <CardDescription className="text-center">Enter your id no. and password to login</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="userId">Student ID</Label>
                <Input autoComplete="off" id="userId" placeholder="I.D. No." {...register("userId")} />
                {errors.userId && <p className="text-red-400 text-sm font-light">{errors.userId.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  autoComplete="off"
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-400 text-sm font-light">{errors.password.message}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full bg-[#268EA7] hover:bg-[#3da7c2]">
                Log In
              </Button>
              <Link to="/register">
                <p className="mt-2 text-xs text-center text-gray-700">
                  Don't have an account yet? <span className=" text-blue-600 hover:underline">Register</span>
                </p>
              </Link>
              <Link to="/resetpassword">
                <p className="mt-2 text-xs text-center text-gray-700">
                  Forgot password? <span className=" text-blue-600 hover:underline">Reset Password</span>
                </p>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;
