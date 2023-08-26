import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Announcement {
  id: string;
  title: string;
  creationDate: Date;
  author: string;
  content: string;
  photo_img_links: string;
}

const Announcement = ({ announcements }: { announcements: Announcement[] }) => {
  const [announceState, setAnnounceState] = useState(false);

  return (
    <div className="w-[60%]">
      {announceState ? (
        <Card className="w-full">
          <CardHeader>
            <Input placeholder="Announcement Title" />
          </CardHeader>

          <CardContent>
            <Textarea rows={5} className="bg-[#fafafa]" placeholder="Announce something to the students" />
          </CardContent>

          <CardFooter className="w-full flex items-center justify-between">
            <Input type="file" accept="image/*" placeholder="Upload a photo" className="w-auto" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setAnnounceState(false)}>
                {" "}
                Cancel{" "}
              </Button>
              <Button className="bg-[#268EA7] hover:bg-[#3da7c2]"> Post </Button>
            </div>
          </CardFooter>
        </Card>
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
        <div className="flex flex-col justify-center items-center">
          {announcements.map((announcement) => {
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
