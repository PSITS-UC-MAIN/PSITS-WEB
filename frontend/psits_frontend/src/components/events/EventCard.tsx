import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useStore from "@/store";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarCheck2, FileEdit, PartyPopper, Trash2 } from "lucide-react";
import { deleteEvent } from "@/api/event";

interface EventCardProps {
  id: string;
  title: string;
  eventDate: Date;
  content: string;
}

const EventCard = ({ id, title, eventDate, content }: EventCardProps) => {
  const parseDate = eventDate.toLocaleString();
  const formattedDate = format(parseISO(parseDate), "PPP");
  const store = useStore();
  const queryClient = useQueryClient();

  const { mutate, reset, isLoading } = useMutation({
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
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.response.data.message || error.message);
    },
  });

  return (
    <Card className="w-[90%]">
      <div className="relevant bg-[#074873] w-full p-4 h-auto rounded-t-md text-white">
        <div className="flex items-center gap-2">
          <CalendarCheck2 size={28} />
          <span className=" text-md font-bold">{formattedDate}</span>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="mb-2">
          <div className="flex gap-4 items-center">
            <PartyPopper size={28} />
            <h1 className="text-xl font-semibold uppercase">{title}!</h1>
          </div>
        </CardTitle>
        <Separator />
        <CardDescription className="breakwords truncate font-light text-gray-700">{content}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col">
        <Button className="w-full" variant="outline">
          <Link to="/events">View Full Context</Link>
        </Button>
        <Button onClick={() => mutate(id)} variant="ghost">
          <Trash2 color="#df2020" size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
