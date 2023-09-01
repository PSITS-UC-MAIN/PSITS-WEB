import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Wrapper from "@/components/Wrapper";
const ResetPasswordSchema = z.object({
    userId: z.string().length(8),
});
const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(ResetPasswordSchema),
    });
    const onSubmit = (data) => {
        //TODO: Send data to the server
        console.log(data);
    };
    return (_jsx(Wrapper, { title: "PSITS | Reset Password", children: _jsx("div", { className: "w-[80%] m-auto bg-white flex flex-col justify-center lg:w-[550px] min-h-screen", children: _jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs(Card, { children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-3xl mb-2 text-center", children: "Reset Password" }), _jsx(CardDescription, { className: "text-center", children: "Enter your id no. to reset your password" })] }), _jsx(CardContent, { className: "grid gap-4", children: _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "userId", children: "Student ID" }), _jsx(Input, { type: "text", id: "userId", placeholder: "I.D. No.", ...register("userId") }), errors.userId && _jsx("p", { className: "text-red-400 text-sm font-light", children: errors.userId.message })] }) }), _jsxs(CardFooter, { className: "flex flex-col", children: [_jsx(Button, { className: "w-full bg-[#268EA7] hover:bg-[#3da7c2]", children: "Send Email" }), _jsx(Link, { to: "/register", children: _jsxs("p", { className: "mt-2 text-xs text-center text-gray-700", children: ["Don't have an account yet? ", _jsx("span", { className: " text-blue-600 hover:underline", children: "Register" })] }) }), _jsx(Link, { to: "/login", children: _jsxs("p", { className: "mt-2 text-xs text-center text-gray-700", children: ["Already have an account? ", _jsx("span", { className: " text-blue-600 hover:underline", children: "Login" })] }) })] })] }) }) }) }));
};
export default ResetPassword;
