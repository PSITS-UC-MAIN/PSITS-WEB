import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useStore from "@/store";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarCheck2, PartyPopper, Trash2 } from "lucide-react";
import { deleteEvent } from "@/api/event";
const EventCard = ({ id, title, eventDate, content }) => {
    const parseDate = eventDate.toLocaleString();
    const formattedDate = format(parseISO(parseDate), "PPP");
    const store = useStore();
    const queryClient = useQueryClient();
    const { mutate, reset } = useMutation({
        mutationFn: deleteEvent,
        onMutate() {
            store.setRequestLoading(true);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["events"]);
            store.setRequestLoading(false);
            toast.success(`${data.message}!`);
            reset();
        },
        onError(error) {
            store.setRequestLoading(false);
            toast.error(error.response.data.message || error.message);
        },
    });
    return (_jsxs(Card, { className: "w-[90%]", children: [_jsx("div", { className: "relevant bg-[#074873] w-full p-4 h-auto rounded-t-md text-white", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CalendarCheck2, { size: 28 }), _jsx("span", { className: " text-md font-bold", children: formattedDate })] }) }), _jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "mb-2", children: _jsxs("div", { className: "flex gap-4 items-center", children: [_jsx(PartyPopper, { size: 28 }), _jsxs("h1", { className: "text-xl font-semibold uppercase", children: [title, "!"] })] }) }), _jsx(Separator, {}), _jsx(CardDescription, { className: "breakwords truncate font-light text-gray-700", children: content })] }), _jsxs(CardFooter, { className: "flex flex-col", children: [_jsx(Button, { className: "w-full", variant: "outline", children: _jsx(Link, { to: "/events", children: "View Full Context" }) }), store.authUser?.isAdmin && (_jsx(Button, { onClick: () => mutate(id), variant: "ghost", children: _jsx(Trash2, { color: "#df2020", size: 16 }) }))] })] }));
};
export default EventCard;
