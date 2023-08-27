import { format } from "date-fns";
import { Link } from "react-router-dom";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarCheck2, PartyPopper } from "lucide-react";

interface EventCardProps {
  title: string;
  creationDate: Date;
  eventDate: Date;
  content: string;
  photo_img_link: string;
}

const EventCard = ({ title, creationDate, eventDate, content, photo_img_link }: EventCardProps) => {
  return (
    <Card className="w-[90%]">
      <div className="relevant bg-[#074873] w-full px-4 h-[50px] rounded-t-md flex items-center gap-2 text-white">
        <CalendarCheck2 size={28} />
        <span className=" text-[1rem] font-bold">{format(eventDate, "PPP")}</span>
      </div>
      <CardHeader>
        <CardTitle>
          <div className="flex gap-4 items-center">
            <PartyPopper size={28} />
            <h1 className="text-xl font-semibold uppercase">{title}!</h1>
          </div>
        </CardTitle>
        <CardDescription>
          <Separator className="mb-4" />
          <p className="breakwords truncate">{content}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" variant="outline">
          <Link to="/events">View Full Context</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
