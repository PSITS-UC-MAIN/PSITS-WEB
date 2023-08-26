import { format } from "date-fns";
import ReackMarkDown from "react-markdown";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FileEdit, Trash2, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AnnouncementCardProps {
  title: string;
  creationDate: Date;
  author: string;
  content: string;
  photo_img_links: string;
}

const AnnoucementCard = ({ title, author, content, creationDate, photo_img_links }: AnnouncementCardProps) => {
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
              <span className="font-light text-sm">{format(creationDate, "PPP | pp")}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <FileEdit size={16} />
            <Trash2 color="#df2020" size={16} />
          </div>
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
        <div className="flex justify-center">
          <img src={photo_img_links} className="h-[600px] " />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnoucementCard;
