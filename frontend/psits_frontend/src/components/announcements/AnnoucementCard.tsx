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

interface AnnouncementCardProps {
  id: string;
  title: string;
  creationDate: Date;
  author: string;
  content: string;
  photo_img_links: string;
}

const AnnoucementCard = ({ id, title, author, content, creationDate, photo_img_links }: AnnouncementCardProps) => {
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
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.response.data.message || error.message);
    },
  });

  return (
    <Card className="w-[90%]  xl:max-w-[700px]">
      <div className="relevant bg-[#074873] w-full h-[10px] rounded-t-md" />
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" className="rounded-full w-[50px]" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{author}</span>
              <span className="font-light text-sm">{formattedDate}</span>
            </div>
          </div>
          {store.authUser?.isAdmin && (
            <div className="flex items-center">
              <Button variant="ghost">
                <FileEdit size={16} />
              </Button>
              <Button onClick={() => mutate(id)} variant="ghost">
                <Trash2 color="#df2020" size={16} />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="break-words">
        <CardTitle>
          <Separator className="mb-5" />
          {title}
        </CardTitle>
        <ReackMarkDown
          children={content}
          className="markdown text-light font-light text-gray-700"
          allowedElements={["p", "br", "strong", "em", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li"]}
        />
        <div className="flex justify-center max-h-[600px]">
          <img src={photo_img_links} className="h-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnoucementCard;
