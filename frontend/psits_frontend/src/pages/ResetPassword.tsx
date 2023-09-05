import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { resetPassword } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Wrapper from "@/components/Wrapper";
import { useMutation } from "@tanstack/react-query";
import useStore from "@/store";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { userId, token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: resetPassword,
    onMutate() {
      store.setRequestLoading(true);
    },
    onSuccess: (data: any) => {
      store.setRequestLoading(false);
      toast.success(`${data.message}!`);
      reset();
      navigate("/login");
    },
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.response.data.message || error.message);
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    console.log(data);
    mutate({ userId, token, data });
  };

  useEffect(() => {
    if (store.authUser && token) {
      navigate("/");
    }
  }, []);

  return (
    <Wrapper title="PSITS | Reset Password">
      <div className="w-[80%] m-auto bg-white flex flex-col justify-center lg:w-[550px] min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl mb-2 text-center">Reset Password</CardTitle>
              <CardDescription className="text-center">Enter your new password</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="passsword">Password</Label>
                <Input type="password" id="passsword" placeholder="Password" {...register("password")} />
                {errors.password && <p className="text-red-400 text-sm font-light">{errors.password.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm font-light">{errors.confirmPassword.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-[#268EA7] hover:bg-[#3da7c2]">
                {isLoading ? <Loader2 className=" animate-spin" /> : "Change Password"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
