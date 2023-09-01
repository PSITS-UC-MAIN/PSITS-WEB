import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import useStore from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Wrapper from "@/components/Wrapper";
const LoginSchema = z.object({
    userId: z.string().length(8),
    password: z.string().min(6),
});
const Login = () => {
    const navigate = useNavigate();
    const store = useStore();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: zodResolver(LoginSchema),
    });
    const { mutate, isLoading } = useMutation({
        mutationFn: loginUser,
        onMutate() {
            store.setRequestLoading(true);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["getCurrentUser"]);
            store.setRequestLoading(false);
            toast.success(`${data.message}!`);
            reset();
            navigate("/");
        },
        onError(error) {
            store.setRequestLoading(false);
            toast.error(error.response.data.message || error.message);
        },
    });
    const onSubmit = (values) => {
        mutate(values);
    };
    return (_jsx(Wrapper, { title: "PSITS | Login", children: _jsx("div", { className: "w-[80%] m-auto bg-white flex flex-col justify-center lg:w-[550px] min-h-screen", children: _jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs(Card, { children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-3xl mb-2 text-center", children: "Log In" }), _jsx(CardDescription, { className: "text-center", children: "Enter your id no. and password to login" })] }), _jsxs(CardContent, { className: "grid gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "userId", children: "Student ID" }), _jsx(Input, { autoComplete: "off", id: "userId", placeholder: "I.D. No.", ...register("userId") }), errors.userId && _jsx("p", { className: "text-red-400 text-sm font-light", children: errors.userId.message })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { autoComplete: "off", id: "password", type: "password", placeholder: "Password", ...register("password") }), errors.password && _jsx("p", { className: "text-red-400 text-sm font-light", children: errors.password.message })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "remember" }), _jsx("label", { htmlFor: "remember", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "Remember me" })] })] }), _jsxs(CardFooter, { className: "flex flex-col", children: [_jsx(Button, { type: "submit", className: "w-full bg-[#268EA7] hover:bg-[#3da7c2]", disabled: isLoading, children: isLoading ? _jsx(Loader2, { className: " animate-spin" }) : "Login" }), _jsx(Link, { to: "/register", children: _jsxs("p", { className: "mt-2 text-xs text-center text-gray-700", children: ["Don't have an account yet? ", _jsx("span", { className: " text-blue-600 hover:underline", children: "Register" })] }) }), _jsx(Link, { to: "/resetpassword", children: _jsxs("p", { className: "mt-2 text-xs text-center text-gray-700", children: ["Forgot password? ", _jsx("span", { className: " text-blue-600 hover:underline", children: "Reset Password" })] }) })] })] }) }) }) }));
};
export default Login;
