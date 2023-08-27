import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Wrapper from "@/components/Wrapper";

const ResetPasswordSchema = z.object({
  userId: z.string().length(8),
});

type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    //TODO: Send data to the server
    console.log(data);
  };

  return (
    <Wrapper title="PSITS | Reset Password">
      <div className="w-[80%] m-auto bg-white flex flex-col justify-center lg:w-[550px] min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl mb-2 text-center">Reset Password</CardTitle>
              <CardDescription className="text-center">Enter your id no. to reset your password</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="userId">Student ID</Label>
                <Input type="text" id="userId" placeholder="I.D. No." {...register("userId")} />
                {errors.userId && <p className="text-red-400 text-sm font-light">{errors.userId.message}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-[#268EA7] hover:bg-[#3da7c2]">Send Email</Button>
              <Link to="/register">
                <p className="mt-2 text-xs text-center text-gray-700">
                  Don't have an account yet? <span className=" text-blue-600 hover:underline">Register</span>
                </p>
              </Link>
              <Link to="/login">
                <p className="mt-2 text-xs text-center text-gray-700">
                  Already have an account? <span className=" text-blue-600 hover:underline">Login</span>
                </p>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
