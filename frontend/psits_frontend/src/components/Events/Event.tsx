import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Event {
  id: string;
  title: string;
  creationDate: Date;
  eventDate: Date;
  content: string;
  photo_img_links: string;
}

const Event = ({ events }: { events: Event[] }) => {
  const [eventState, setEventState] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <div className="w-[400px]">
      {eventState ? (
        <Card className="w-full">
          <CardHeader>
            <Input placeholder="Event Title" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <Textarea rows={4} className="bg-[#fafafa]" placeholder="Event description" />
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-4">
            <Input type="file" accept="image/*" placeholder="Upload a photo" />
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setDate(undefined);
                  setEventState(false);
                }}
              >
                {" "}
                Cancel{" "}
              </Button>
              <Button className="bg-[#268EA7] hover:bg-[#3da7c2]"> Post </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div
          onClick={() => setEventState(true)}
          className="w-full border rounded shadow p-6 cursor-pointer flex items-center gap-4"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-gray-500 text-sm">Click me to add new event!</h1>
        </div>
      )}
      <div className="mt-4 border shadow p-4 rounded">
        <h1 className="text-center font-bold text-2xl mb-4">Upcoming Events</h1>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Event;
