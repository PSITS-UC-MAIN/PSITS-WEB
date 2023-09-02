import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { updateCurrentUser } from "@/api/user";
import useStore from "@/store";
import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const EditProfile = z
  .object({
    avatar: z.any(),
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    rfid: z.string().optional(),
    email: z.string().email(),
    course: z.string(),
    year: z.string()
  });

type EditProfile = z.infer<typeof EditProfile>;

const Profile = () => {
  const [files, setFiles] = useState<File[]>([]);
  const store = useStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<EditProfile>({
    resolver: zodResolver(EditProfile),
    defaultValues: {
      avatar: "",
      firstname: store.authUser?.firstname,
      lastname: store.authUser?.lastname,
      rfid: store.authUser?.rfid,
      email: store.authUser?.email,
      course: store.authUser?.course,
      year: store.authUser?.year.toString(),
    },
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onMutate() {
      store.setRequestLoading(true);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(["getCurrentUser"]);
      store.setRequestLoading(false);
      toast.success(`${data.message}`);
    },
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.response.data.message || error.message);
    },
  });

  const onSubmit = (values: EditProfile) => {
    // BUG TO FIX: i dunno why tf it logged out and navigate to home after the submit
    delete values.avatar

    const formData = new FormData();
    formData.append("avatar", files[0]);
    formData.append("user", JSON.stringify(values));

    console.log(files.length > 0)
    if (files.length > 0) {
      mutate(formData);
    } else {
      mutate(values)
    }
  };

  // prevent non-logged user from accessing the profile page
  useEffect(() => {
    if (!store.authUser) {
      toast.error("You are not authorize to access that site.");
      navigate("/");
      return;
    }
  }, []);


  return (
    <Wrapper title="PSITS | Profile">
      <div className="flex flex-col mt-10 mb-20 gap-y-10 mx-[20%]">
        <div className="flex justify-center">
          <span className="font-bold text-4xl">Edit Profile</span>
        </div>
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-center mb-8">
                    {field.value ? (
                      <img src={field.value} className="h-[200px] w-[200px] shadow border object-fill rounded-full" />
                    ) : (
                      <img
                        src={store.authUser?.avatar}
                        className="h-[200px] object-fill shadow border w-[200px] rounded-full "
                      />
                    )}
                    <FormLabel htmlFor="image">
                      <Pencil
                        className="bg-[#268EA7] hover:bg-[#3da7c2] w-[40px] h-[40px] rounded-full absolute border-2 z-30 p-2"
                        color="#ffffff"
                      />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="hidden"
                        id="image"
                        onChange={(e) => handleImage(e, field.onChange)}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <div className="flex flex-col gap-3 w-auto">
                    <Label className="text-gray-500">First Name</Label>
                    <Input autoComplete="off" id="firstname" className="" {...field} />
                    {form.formState.errors.firstname && (
                      <p className="text-red-400 text-sm font-light">{form.formState.errors.firstname.message}</p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <Label className="text-gray-500">Last Name</Label>
                    <Input autoComplete="off" id="lastname" {...field}></Input>
                    {form.formState.errors.lastname && (
                      <p className="text-red-400 text-sm font-light">{form.formState.errors.lastname.message}</p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="rfid"
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <Label className="text-gray-500">RFID</Label>
                    <Input autoComplete="off" id="rfid" {...field}></Input>
                    {form.formState.errors.lastname && (
                      <p className="text-red-400 text-sm font-light">{form.formState.errors.lastname.message}</p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <Label className="text-gray-500">E-mail</Label>
                    <Input autoComplete="off" id="email" placeholder="Enter your e-mail" {...field} />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm font-light">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <Label className="text-gray-500">Course</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Course</SelectLabel>
                          <SelectItem value="BSIT">BSIT</SelectItem>
                          <SelectItem value="BSCS">BSCS</SelectItem>
                          <SelectItem value="ACT">ACT</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.course && (
                      <p className="text-red-400 text-sm font-light">{form.formState.errors.course.message}</p>
                    )}
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <div className="flex flex-col gap-3">
                    <Label className="text-gray-500">Year</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    {form.formState.errors.year && (
                      <p className="text-red-400 text-sm font-light">{form.formState.errors.year.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
            <Button type="submit" className="w-full mt-6 bg-[#268EA7] hover:bg-[#3da7c2]" hidden={isLoading}>
              {isLoading ? <Loader2 className=" animate-spin" /> : "Save Changes"}
            </Button>
          </form>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Profile;
