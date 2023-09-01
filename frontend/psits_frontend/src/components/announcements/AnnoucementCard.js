import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format, parseISO } from "date-fns";
import ReackMarkDown from "react-markdown";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteAnnouncement } from "@/api/announcement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FileEdit, Trash2, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import useStore from "@/store";
import { toast } from "react-toastify";
const AnnoucementCard = ({ id, title, author, content, creationDate, photo_img_links }) => {
    const store = useStore();
    const queryClient = useQueryClient();
    const parseDate = creationDate.toLocaleString();
    const formattedDate = format(parseISO(parseDate), "PPP | pp");
    const { mutate, reset } = useMutation({
        mutationFn: deleteAnnouncement,
        onMutate() {
            store.setRequestLoading(true);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["announcements"]);
            store.setRequestLoading(false);
            toast.success(`${data.message}!`);
            reset();
        },
        onError(error) {
            store.setRequestLoading(false);
            toast.error(error.response.data.message || error.message);
        },
    });
    return (_jsxs(Card, { className: "w-[90%]  xl:max-w-[700px]", children: [_jsx("div", { className: "relevant bg-[#074873] w-full h-[10px] rounded-t-md" }), _jsx(CardHeader, { children: _jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "https://github.com/shadcn.png", className: "rounded-full w-[50px]" }), _jsx(AvatarFallback, { children: _jsx(User, {}) })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-lg font-semibold", children: author }), _jsx("span", { className: "font-light text-sm", children: formattedDate })] })] }), store.authUser?.isAdmin && (_jsxs("div", { className: "flex items-center", children: [_jsx(Button, { variant: "ghost", children: _jsx(FileEdit, { size: 16 }) }), _jsx(Button, { onClick: () => mutate(id), variant: "ghost", children: _jsx(Trash2, { color: "#df2020", size: 16 }) })] }))] }) }), _jsxs(CardContent, { className: "break-words", children: [_jsxs(CardTitle, { children: [_jsx(Separator, { className: "mb-5" }), title] }), _jsx(ReackMarkDown, { children: content, className: "markdown text-light font-light text-gray-700", allowedElements: ["p", "br", "strong", "em", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li"] }), _jsx("div", { className: "flex justify-center max-h-[600px]", children: _jsx("img", { src: photo_img_links, className: "h-full" }) })] })] }));
};
export default AnnoucementCard;
