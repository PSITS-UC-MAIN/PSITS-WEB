import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { AlertCircle, Calendar as CalendarIcon, Loader2, Loader2Icon } from "lucide-react";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import EventCard from "./EventCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useStore from "@/store";
import { toast } from "react-toastify";
import { createEvent } from "@/api/event";
const EventSchema = z.object({
    title: z.string().min(4),
    content: z.string().min(4),
    eventDate: z.date(),
    image: z.any(),
});
const Event = ({ events, isLoading, isError }) => {
    const [eventState, setEventState] = useState(false);
    const [files, setFiles] = useState([]);
    const store = useStore();
    const queryClient = useQueryClient();
    const form = useForm({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            title: "",
            content: "",
            eventDate: undefined,
            image: "",
        },
    });
    const { mutate, isLoading: createIsLoading } = useMutation({
        mutationFn: createEvent,
        onMutate() {
            store.setRequestLoading(true);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["events"]);
            store.setRequestLoading(false);
            toast.success(`${data.message}!`);
            form.reset();
            setEventState(false);
        },
        onError(error) {
            store.setRequestLoading(false);
            toast.error(error.response.data.message || error.message);
        },
    });
    const handleImage = (e, fieldChange) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));
            if (!file.type.includes("image"))
                return;
            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };
            fileReader.readAsDataURL(file);
            console.log(files);
        }
    };
    const onSubmit = async (data) => {
        const blob = data.image;
        console.log(data);
        mutate(data);
    };
    return (_jsxs("div", { className: "w-[70%] max-w-[350px] hidden lg:block", children: [store.authUser?.isAdmin && (_jsx(_Fragment, { children: eventState ? (_jsx(Form, { ...form, children: _jsx("form", { onSubmit: form.handleSubmit(onSubmit), children: _jsxs(Card, { className: "w-full mb-4", children: [_jsxs(CardHeader, { children: [_jsx(FormField, { control: form.control, name: "title", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "title" }), _jsx(Input, { id: "title", placeholder: "Event Title", ...field })] })) }), form.formState.errors.title && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.title.message }))] }), _jsxs(CardContent, { className: "flex flex-col gap-4", children: [_jsx(FormField, { control: form.control, name: "eventDate", render: ({ field }) => (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: `justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`, children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), field.value ? format(field.value, "PPP") : _jsx("span", { children: "Pick a date" })] }) }), _jsx(PopoverContent, { className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", selected: field.value, onSelect: field.onChange, disabled: (date) => date < new Date(), initialFocus: true }) })] })) }), _jsx(FormField, { control: form.control, name: "content", render: ({ field }) => (_jsx(Textarea, { rows: 4, className: "bg-[#fafafa]", placeholder: "Event description", ...field })) }), form.formState.errors.content && (_jsx("p", { className: "text-red-400 text-sm font-light", children: form.formState.errors.content.message }))] }), _jsxs(CardFooter, { className: "flex flex-col items-end gap-4", children: [_jsx(FormField, { control: form.control, name: "image", render: ({ field }) => (_jsx(Input, { type: "file", accept: "image/*", placeholder: "Upload a photo", onChange: (e) => handleImage(e, field.onChange) })) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "ghost", onClick: () => {
                                                        setEventState(false);
                                                    }, children: "Cancel" }), _jsx(Button, { className: "bg-[#268EA7] hover:bg-[#3da7c2]", disabled: createIsLoading, children: createIsLoading ? _jsx(Loader2, { className: " animate-spin" }) : "Post" })] })] })] }) }) })) : (_jsxs("div", { onClick: () => setEventState(true), className: "w-full mb-4 border rounded shadow p-6 cursor-pointer flex items-center gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "https://github.com/shadcn.png" }), _jsx(AvatarFallback, { children: _jsx(User, {}) })] }), _jsx("h1", { className: "text-gray-500 text-sm", children: "Click me to add new event!" })] })) })), _jsxs("div", { className: "border shadow p-4 rounded bg-[#F9F9F9]", children: [_jsx("h1", { className: "text-center font-bold text-2xl mb-4", children: "Upcoming Events" }), isLoading ? (_jsx("span", { className: "text-center flex justify-center", children: _jsx(Loader2Icon, { className: "animate-spin" }) })) : isError ? (_jsxs("div", { className: "flex items-center gap-2 text-red-500  justify-center", children: [_jsx(AlertCircle, {}), _jsx("p", { children: "Something went wrong!" })] })) : (_jsx("div", { className: "flex flex-col gap-4 items-center", children: events.map((event) => {
                            return (_jsx(EventCard, { id: event._id, title: event.title, content: event.content, eventDate: event.eventDate }, event._id.toString()));
                        }) }))] })] }));
};
export default Event;
