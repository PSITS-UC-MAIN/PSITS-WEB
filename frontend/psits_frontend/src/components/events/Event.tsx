import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { AlertCircle, Calendar as CalendarIcon, Loader2, Loader2Icon } from "lucide-react";

import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import EventCard from "./EventCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useStore from "@/store";
import { toast } from "react-toastify";
import { createEvent } from "@/api/event";

interface Event {
  _id: string;
  title: string;
  creationDate: Date;
  eventDate: Date;
  content: string;
  image: string;
}

const EventSchema = z.object({
  title: z.string().min(4).max(50),
  content: z.string().min(4).max(500),
  eventDate: z.date(),
});

type EventSchema = z.infer<typeof EventSchema>;

const Event = ({ events, isLoading, isError }: { events: Event[]; isLoading: boolean; isError: boolean }) => {
  const [eventState, setEventState] = useState(false);
  const store = useStore();
  const queryClient = useQueryClient();

  const form = useForm<EventSchema>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      content: "",
      eventDate: undefined,
    },
  });

  const { mutate, isLoading: createIsLoading } = useMutation({
    mutationFn: createEvent,
    onMutate() {
      store.setRequestLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["events"]);
      store.setRequestLoading(false);
      toast.success(`${data.message}!`);
      form.reset();
      setEventState(false);
    },
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.response.data.message || error.message);
    },
  });

  const onSubmit = async (data: EventSchema) => {
    mutate(data);
  };

  return (
    <div className="w-[70%] max-w-[350px] hidden lg:block">
      {store.authUser?.isAdmin && (
        <>
          {eventState ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full mb-4">
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
                              className={`justify-start text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
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
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setEventState(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button className="bg-[#268EA7] hover:bg-[#3da7c2]" disabled={createIsLoading}>
                        {createIsLoading ? <Loader2 className=" animate-spin" /> : "Post"}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          ) : (
            <div
              onClick={() => setEventState(true)}
              className="w-full mb-4 border rounded shadow p-6 cursor-pointer flex items-center gap-4"
            >
              <Avatar>
                <AvatarImage src={store.authUser.avatar} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <h1 className="text-gray-500 text-sm">Click me to add new event!</h1>
            </div>
          )}
        </>
      )}
      <div className="border shadow p-4 rounded bg-[#F9F9F9]">
        <h1 className="text-center font-bold text-2xl mb-4">Upcoming Events</h1>
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
          <div className="flex flex-col gap-4 items-center">
            {events.map((event) => {
              return (
                <EventCard
                  key={event._id.toString()}
                  id={event._id}
                  title={event.title}
                  content={event.content}
                  eventDate={event.eventDate}
                  image={event.image}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
