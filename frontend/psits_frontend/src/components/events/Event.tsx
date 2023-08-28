import { useState, ChangeEvent } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { psits_banner2 } from "@/assets";
import EventCard from "./EventCard";
// import { isBase64Image } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  creationDate: Date;
  eventDate: Date;
  content: string;
  photo_img_links: string;
}

const dummyData: Event[] = [
  {
    id: "1234",
    title: "BONDING DAY",
    creationDate: new Date("August 27, 2023 09:37:00"),
    eventDate: new Date("August 27, 2023 09:37:00"),
    content: "wassup mananap",
    photo_img_links: psits_banner2,
  },
  {
    id: "12345",
    title: "SIR DD",
    creationDate: new Date("August 27, 2023 09:37:00"),
    eventDate: new Date("August 28, 2023 09:37:00"),
    content: "ayaw kol",
    photo_img_links: psits_banner2,
  },
];

const EventSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(4),
  eventDate: z.date(),
  image: z.any(),
});

type EventSchema = z.infer<typeof EventSchema>;

const Event = ({ events }: { events: Event[] }) => {
  const [eventState, setEventState] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<EventSchema>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      content: "",
      eventDate: undefined,
      image: "",
    },
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
      console.log(files);
    }
  };
  const onSubmit = async (data: EventSchema) => {
    const blob = data.image;
    // const hasImageChanged = isBase64Image(blob);
    // console.log(hasImageChanged);
    //TODO: Send data to the server
    console.log(data);

    const newData = {
      id: (Math.random() * 1000).toString(),
      title: data.title,
      creationDate: new Date(),
      eventDate: data.eventDate,
      content: data.content,
      photo_img_links: "",
    };

    dummyData.push(newData);
    setEventState(false);
  };

  return (
    <div className="w-[70%] max-w-[350px] hidden lg:block">
      {eventState ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-full">
              <CardHeader>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title" />
                      <Input id="title" placeholder="Event Title" {...field} />
                    </FormItem>
                  )}
                />
                {form.formState.errors.title && (
                  <p className="text-red-400 text-sm font-light">{form.formState.errors.title.message}</p>
                )}
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <Textarea rows={4} className="bg-[#fafafa]" placeholder="Event description" {...field} />
                  )}
                />
                {form.formState.errors.content && (
                  <p className="text-red-400 text-sm font-light">{form.formState.errors.content.message}</p>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-end gap-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Upload a photo"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  )}
                />
                {/* {form.formState.errors.image && <p className="text-red-400 text-sm font-light">{form.formState.errors.image.message}</p>} */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setEventState(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-[#268EA7] hover:bg-[#3da7c2]"> Post </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
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
      <div className="mt-4 border shadow p-4 rounded bg-[#F9F9F9]">
        <h1 className="text-center font-bold text-2xl mb-4">Upcoming Events</h1>
        <div className="flex flex-col gap-4 items-center">
          {dummyData.map((announcement) => {
            return (
              <EventCard
                key={announcement.id}
                title={announcement.title}
                eventDate={announcement.eventDate}
                content={announcement.content}
                photo_img_link={announcement.photo_img_links}
                creationDate={announcement.creationDate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Event;
