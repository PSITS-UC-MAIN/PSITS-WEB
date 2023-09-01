import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import { registerUser } from "@/api/auth";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/Wrapper";
import useStore from "@/store";
const RegisterSchema = z
    .object({
    userId: z.string().length(8),
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.string().email(),
    course: z.string(),
    year: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
})
    .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
});
const Register = () => {
    const navigate = useNavigate();
    const store = useStore();
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            userId: "",
            firstname: "",
            lastname: "",
            email: "",
            course: undefined,
            year: undefined,
            password: "",
            confirmPassword: "",
        },
    });
    const { mutate, isLoading } = useMutation({
        mutationFn: registerUser,
        onMutate() {
            store.setRequestLoading(true);
        },
        onSuccess: (data) => {
            console.log(data);
            store.setRequestLoading(false);
            toast.success(`${data.message}!`);
            toast.info("You can now login!");
            form.reset();
            navigate("/login");
        },
        onError(error) {
            store.setRequestLoading(false);
            toast.error(error.response.data.message || error.message);
        },
    });
    const onSubmit = (values) => {
        //Send values to the server
        mutate(values);
    };
    return (_jsx(Wrapper, { title: "PSITS | Register", className: "my-10", children: _jsx(Form, { ...form, children: _jsx("div", { className: "w-[80%] m-auto bg-white flex flex-col justify-center lg:w-[550px] min-h-screen", children: _jsx("form", { autoComplete: "off", onSubmit: form.handleSubmit(onSubmit), children: _jsxs(Card, { children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-3xl mb-2 text-center", children: "Register" }), _jsx(CardDescription, { className: "text-center", children: "Fill out the form to register" })] }), _jsxs(CardContent, { className: "grid gap-4", children: [_jsx(FormField, { control: form.control, name: "userId", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "user_id", children: "Student ID" }), _jsx(FormControl, { children: _jsx(Input, { id: "user_id", type: "text", placeholder: "I.D. No.", ...field }) })] })) }), form.formState.errors.userId && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.userId.message })), _jsx(FormField, { control: form.control, name: "firstname", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "firstname", children: "Firstname" }), _jsx(FormControl, { children: _jsx(Input, { id: "firstname", type: "text", placeholder: "Firstname", ...field }) })] })) }), form.formState.errors.firstname && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.firstname.message })), _jsx(FormField, { control: form.control, name: "lastname", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "lastname", children: "Lastname" }), _jsx(FormControl, { children: _jsx(Input, { id: "lastname", type: "text", placeholder: "Lastname", ...field }) })] })) }), form.formState.errors.lastname && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.lastname.message })), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "email", children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { id: "email", type: "email", placeholder: "Email", ...field }) })] })) }), form.formState.errors.lastname && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.lastname.message })), _jsx(FormField, { control: form.control, name: "course", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "course", children: "Course" }), _jsx(FormControl, { children: _jsxs(Select, { onValueChange: field.onChange, children: [_jsx(SelectTrigger, { id: "course", children: _jsx(SelectValue, { placeholder: "Select your course" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "BSIT", children: "BSIT" }), _jsx(SelectItem, { value: "BSCS", children: "BSCS" }), _jsx(SelectItem, { value: "ACT", children: "ACT" })] })] }) })] })) }), form.formState.errors.course && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.course.message })), _jsx(FormField, { control: form.control, name: "year", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "year", children: "Year" }), _jsx(FormControl, { children: _jsxs(Select, { onValueChange: field.onChange, children: [_jsx(SelectTrigger, { id: "year", children: _jsx(SelectValue, { placeholder: "Select your current year" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1", children: "1" }), _jsx(SelectItem, { value: "2", children: "2" }), _jsx(SelectItem, { value: "3", children: "3" }), _jsx(SelectItem, { value: "4", children: "4" })] })] }) })] })) }), form.formState.errors.year && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.year.message })), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "password", children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { id: "password", type: "password", placeholder: "Password", ...field }) })] })) }), form.formState.errors.password && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.password.message })), _jsx(FormField, { control: form.control, name: "confirmPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsx(FormControl, { children: _jsx(Input, { id: "confirmPassword", type: "password", placeholder: "Confirm Password", ...field }) })] })) }), form.formState.errors.confirmPassword && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.confirmPassword.message }))] }), _jsxs(CardFooter, { className: "flex flex-col", children: [_jsx(Button, { type: "submit", className: "w-full bg-[#268EA7] hover:bg-[#3da7c2]", disabled: isLoading, children: isLoading ? _jsx(Loader2, { className: " animate-spin" }) : "Register" }), _jsx(Link, { to: "/login", children: _jsxs("p", { className: "mt-2 text-xs text-center text-gray-700", children: ["Already have an account? ", _jsx("span", { className: " text-blue-600 hover:underline", children: "Log In" })] }) })] })] }) }) }) }) }));
};
export default Register;
