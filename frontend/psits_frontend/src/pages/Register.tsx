import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/Wrapper";

const RegisterSchema = z
  .object({
    userId: z.string().min(8).max(15),
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    course: z.string(),
    year: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

type RegisterSchema = z.infer<typeof RegisterSchema>;

const Register = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    //TODO: Send data to the server
    console.log(data);
  };

  return (
    <Wrapper title="PSITS | Register" className="my-10">
      <Form {...form}>
        <div className="w-[80%] m-auto bg-white flex flex-col justify-center lg:w-[550px] min-h-screen">
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-3xl mb-2 text-center">Register</CardTitle>
                <CardDescription className="text-center">Fill out the form to register</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="userId">Student ID</FormLabel>
                      <FormControl>
                        <Input id="userId" type="text" placeholder="I.D. No." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.userId && (
                  <p className="text-red-400 text-sm font-light">{form.formState.errors.userId.message}</p>
                )}
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="firstname">Firstname</FormLabel>
                      <FormControl>
                        <Input id="firstname" type="text" placeholder="Firstname" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.firstname && (
                  <p className="text-red-400 text-sm font-light">{form.formState.errors.firstname.message}</p>
                )}
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="lastname">Lastname</FormLabel>
                      <FormControl>
                        <Input id="lastname" type="text" placeholder="Lastname" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.lastname && (
                  <p className="text-red-400 text-sm font-light">{form.formState.errors.lastname.message}</p>
                )}
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BSIT">BSIT</SelectItem>
                            <SelectItem value="BSCS">BSCS</SelectItem>
                            <SelectItem value="ACT">ACT</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.course && (
                  <p className="text-red-400 text-sm font-light">{form.formState.errors.course.message}</p>
                )}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your current year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.year && (
                  <p className="text-red-400 text-sm font-light">{form.formState.errors.year.message}</p>
                )}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" placeholder="Password" {...field} />
                        {/* {form.userId && <p className="text-red-400 text-sm font-light">{errors.userId.message}</p>} */}
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.password && (
                  <p className="text-red-400 text-sm font-light">{form.formState.errors.password.message}</p>
                )}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <FormControl>
                        <Input id="confirmPassword" type="password" placeholder="Confirm Password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-red-400 text-sm font-light">{form.formState.errors.confirmPassword.message}</p>
                )}
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full bg-[#268EA7] hover:bg-[#3da7c2]">
                  Register
                </Button>
                <Link to="/login">
                  <p className="mt-2 text-xs text-center text-gray-700">
                    Already have an account? <span className=" text-blue-600 hover:underline">Log In</span>
                  </p>
                </Link>
              </CardFooter>
            </Card>
          </form>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Register;
