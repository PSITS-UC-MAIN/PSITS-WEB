import { getAllEvents } from "@/api/event";
import Wrapper from "@/components/Wrapper";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { AlertCircle, Loader2Icon } from "lucide-react";

const Events = () => {
  const {
    data: eventData,
    isLoading,
    isError,
  } = useQuery(["events"], getAllEvents, {
    select(eventData) {
      return eventData.events;
    },
  });

  return (
    <Wrapper title="PSITS | Events" className="my-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#074873]">All Events</h1>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {isLoading ? (
          <span className="text-center flex justify-center">
            <Loader2Icon className="animate-spin" />
          </span>
        ) : isError ? (
          <div className="flex items-center gap-2 text-red-500  justify-center">
            <AlertCircle />
            <p>Something went wrong!</p>
          </div>
        ) : (
          <>
            {eventData.map((event: any) => {
              const parseDate = event.eventDate.toLocaleString();
              const formattedDate = format(parseISO(parseDate), "PPP | pp");
              return (
                <Card key={event._id} className="w-[500px] h-[300px] flex ">
                  <div className="h-full bg-[#074873] w-[90px] rounded-l" />
                  <div className="w-full p-6">
                    <h1 className="text-3xl font-bold uppercase">{event.title}</h1>
                    <h1 className="text-lg text-slate-700 ">{formattedDate}</h1>
                    <Separator className="mb-4 mt-2" />
                    <p className="text-justify text-slate-600">{event.content}</p>
                  </div>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Events;
