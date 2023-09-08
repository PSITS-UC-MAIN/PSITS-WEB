import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAllEvents } from "@/api/event";
import { format, parseISO } from "date-fns";
import { AlertCircle, Loader2Icon } from "lucide-react";

const EventsTable = () => {
  const { data, isLoading, isError } = useQuery(["adevents"], getAllEvents, {
    select(eventData) {
      return eventData.events;
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of events.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
          </TableRow>
        </TableHeader>
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
          <TableBody>
            {data?.map((event: any) => {
              const parseEventDate = event.eventDate.toLocaleString();
              const parseCreationDate = event.creationDate.toLocaleString();
              const formattedEventDate = format(parseISO(parseEventDate), "PPP");
              const formattedCreationDate = format(parseISO(parseCreationDate), "PPP");

              return (
                <TableRow key={event._id}>
                  <TableCell>{`${event.author.firstname} ${event.author.lastname}`}</TableCell>
                  <TableCell>{formattedCreationDate}</TableCell>
                  <TableCell>{formattedEventDate}</TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.content}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default EventsTable;
