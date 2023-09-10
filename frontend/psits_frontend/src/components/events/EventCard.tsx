import { format, parseISO } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useStore from "@/store";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarCheck2, PartyPopper, Trash2 } from "lucide-react";
import { deleteEvent } from "@/api/event";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EventCardProps {
  id: string;
  title: string;
  eventDate: Date;
  content: string;
  image: string;
}

const EventCard = ({ id, title, eventDate, content }: EventCardProps) => {
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
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.response.data.message || error.message);
    },
  });

  return (
    <Card className="w-full">
      <div className="relevant bg-[#074873] w-full p-4 h-auto rounded-t-md text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck2 size={28} />
            <span className=" text-md font-bold">{formattedDate}</span>
          </div>
          {store.authUser?.isAdmin && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <Trash2 color="#df2020" size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the event and remove the data from the
                    server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => mutate(id)} className="bg-[#074873] hover:bg-[#2d7db3]">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      <CardHeader>
        <div className="mb-2 flex gap-4 items-center">
          <PartyPopper size={32} />
          <h1 className="text-xl font-semibold uppercase">{title}!</h1>
        </div>
        <Separator />
        <div>
          <p className="mt-3 breakwords truncate font-light text-gray-700">{content}</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default EventCard;
