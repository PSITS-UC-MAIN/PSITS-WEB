import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncement } from "@/api/announcement";
import AnnoucementCard from "./AnnoucementCard";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Loader2Icon, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useStore from "@/store";
import { toast } from "react-toastify";
const AnnouncementSchema = z.object({
    title: z.string().min(4),
    content: z.string().min(4),
    image: z.any(),
});
const Announcement = ({ announcements, isLoading, isError, }) => {
    const [announceState, setAnnounceState] = useState(false);
    const store = useStore();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: zodResolver(AnnouncementSchema),
    });
    const { mutate, isLoading: createIsLoading } = useMutation({
        mutationFn: createAnnouncement,
        onMutate() {
            store.setRequestLoading(true);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["announcements"]);
            store.setRequestLoading(false);
            toast.success(`${data.message}!`);
            reset();
            setAnnounceState(false);
        },
        onError(error) {
            store.setRequestLoading(false);
            toast.error(error.response.data.message || error.message);
        },
    });
    const onSubmit = (data) => {
        mutate(data);
    };
    return (_jsxs("div", { className: "w-[90%] xl:max-w-[70%]", children: [store.authUser?.isAdmin && (_jsx(_Fragment, { children: announceState ? (_jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(Input, { placeholder: "Announcement Title", ...register("title") }), errors.title && _jsx("p", { className: "text-red-400 text-sm font-light", children: errors.title.message })] }), _jsxs(CardContent, { children: [_jsx(Textarea, { rows: 5, className: "bg-[#fafafa]", placeholder: "Announce something to the students", ...register("content") }), errors.content && _jsx("p", { className: "text-red-400 text-sm font-light", children: errors.content.message })] }), _jsxs(CardFooter, { className: "w-full flex items-center justify-between", children: [_jsx(Input, { type: "file", accept: "image/*", placeholder: "Upload a photo", className: "w-auto", ...register("image") }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "ghost", onClick: () => setAnnounceState(false), children: "Cancel" }), _jsx(Button, { className: "bg-[#268EA7] hover:bg-[#3da7c2]", disabled: createIsLoading, children: createIsLoading ? _jsx(Loader2, { className: " animate-spin" }) : "Post" })] })] })] }) })) : (_jsxs("div", { onClick: () => setAnnounceState(true), className: "mb-4 w-full border rounded shadow p-6 cursor-pointer flex items-center gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "https://github.com/shadcn.png" }), _jsx(AvatarFallback, { children: _jsx(User, {}) })] }), _jsx("h1", { className: "text-gray-500 text-sm", children: "Announce something to the students" })] })) })), _jsxs("div", { className: "border shadow rounded p-4 bg-[#F9F9F9]", children: [_jsx("h1", { className: "text-center font-bold text-3xl mb-4", children: "Announcements" }), isLoading ? (_jsx("span", { className: "text-center flex justify-center", children: _jsx(Loader2Icon, { className: "animate-spin" }) })) : isError ? (_jsxs("div", { className: "flex items-center gap-2 text-red-500  justify-center", children: [_jsx(AlertCircle, {}), _jsx("p", { children: "Something went wrong!" })] })) : (_jsx("div", { className: "flex flex-col justify-center items-center gap-4", children: announcements.map((announcement) => {
                            return (_jsx(AnnoucementCard, { id: announcement._id, title: announcement.title, author: `${announcement.author.firstname} ${announcement.author.lastname}`, creationDate: announcement.creationDate, content: announcement.content, photo_img_links: announcement.photo_img_links }, announcement._id.toString()));
                        }) }))] })] }));
};
export default Announcement;
