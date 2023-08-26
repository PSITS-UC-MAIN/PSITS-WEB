import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const dummyData = [
  {
    id: "1234",
    title: "Tidert Gaming",
    creationDate: new Date(),
    author: "kean",
    content: "wassup mananap",
    photo_img_links: "",
  },
  {
    id: "12345",
    title: "Need maney",
    creationDate: new Date(),
    author: "darelle",
    content: "ayaw kol",
    photo_img_links: "",
  },
];

interface Announcement {
  id: string;
  title: string;
  creationDate: Date;
  author: string;
  content: string;
  photo_img_links: string;
}

const AnnouncementSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(4),
  image: z.any(),
});

type AnnouncementSchema = z.infer<typeof AnnouncementSchema>;

const Announcement = ({ announcements }: { announcements: Announcement[] }) => {
  const [announceState, setAnnounceState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnnouncementSchema>({
    resolver: zodResolver(AnnouncementSchema),
  });

  const onSubmit: SubmitHandler<AnnouncementSchema> = (data) => {
    //TODO: Send data to the server
    console.log(data);

    const newData = {
      id: (Math.random() * 1000).toString(),
      title: data.title,
      creationDate: new Date(),
      author: "User",
      content: data.content,
      photo_img_links: "",
    };

    dummyData.push(newData);
    setAnnounceState(false);
  };

  return (
    <div className="w-[70%]">
      {announceState ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-full">
            <CardHeader>
              <Input placeholder="Announcement Title" {...register("title")} />
              {errors.title && <p className="text-red-400 text-sm font-light">{errors.title.message}</p>}
            </CardHeader>

            <CardContent>
              <Textarea
                rows={5}
                className="bg-[#fafafa]"
                placeholder="Announce something to the students"
                {...register("content")}
              />
              {errors.content && <p className="text-red-400 text-sm font-light">{errors.content.message}</p>}
            </CardContent>
            <CardFooter className="w-full flex items-center justify-between">
              <Input
                type="file"
                accept="image/*"
                placeholder="Upload a photo"
                className="w-auto"
                {...register("image")}
              />
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setAnnounceState(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#268EA7] hover:bg-[#3da7c2]"> Post </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      ) : (
        <div
          onClick={() => setAnnounceState(true)}
          className="mb-4 w-full border rounded shadow p-6 cursor-pointer flex items-center gap-4"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-gray-500 text-sm">Announce something to the students</h1>
        </div>
      )}

      <div className="border shadow rounded p-4">
        <h1 className="text-center font-bold text-3xl mb-4">Announcements</h1>
        <div className="flex flex-col justify-center items-center gap-4">
          {dummyData.map((announcement) => {
            return (
              <Card className="w-[90%]" key={announcement.id}>
                <CardHeader>
                  <CardTitle>{announcement.title}</CardTitle>
                  <CardDescription>{announcement.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{announcement.content}</p>
                </CardContent>
                <CardFooter>
                  <p>{announcement.creationDate.toISOString()}</p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
