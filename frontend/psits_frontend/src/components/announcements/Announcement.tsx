import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAnnouncement } from "@/api/announcement";
import AnnoucementCard from "./AnnoucementCard";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Loader2Icon, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import useStore from "@/store";
import { toast } from "react-toastify";

interface Announcement {
  _id: string;
  title: string;
  creationDate: Date;
  author: string;
  content: string;
  images: [
    {
      image: string;
      imagePublicId: string;
    },
  ];
}

const AnnouncementSchema = z.object({
  title: z.string().min(4).max(50),
  content: z.string().min(4).max(1000),
  images: z.any(),
});

type AnnouncementSchema = z.infer<typeof AnnouncementSchema>;

const Announcement = ({
  announcements,
  isLoading,
  isError,
}: {
  announcements: Announcement[];
  isLoading: boolean;
  isError: boolean;
}) => {
  const [announceState, setAnnounceState] = useState(false);
  const store = useStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnnouncementSchema>({
    resolver: zodResolver(AnnouncementSchema),
  });

  const { mutate, isLoading: createIsLoading } = useMutation({
    mutationFn: createAnnouncement,
    onMutate() {
      store.setRequestLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["announcements"]);
      store.setRequestLoading(false);
      toast.success(`${data.message}!`, {
        position: "bottom-right",
      });
      reset();
      setAnnounceState(false);
    },
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.response.data.message || error.message, {
        position: "bottom-right",
      });
    },
  });

  const onSubmit: SubmitHandler<AnnouncementSchema> = (data) => {
    // check if there's an image uploaded
    if (data.images.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < data.images.length; formData.append("images", data.images[i]), i++);
      formData.append("announcement", JSON.stringify(data));
      mutate(formData);
    } else {
      data.images = "";
      mutate(data);
    }
  };

  return (
    <div className="w-[90%] xl:max-w-[70%]">
      {store.authUser?.isAdmin && (
        <>
          {announceState ? (
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <Card className="mb-4 w-full">
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
                    multiple
                    {...register("images")}
                  />
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => setAnnounceState(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-[#268EA7] hover:bg-[#3da7c2]" disabled={createIsLoading}>
                      {createIsLoading ? <Loader2 className=" animate-spin" /> : "Post"}
                    </Button>
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
                <AvatarImage src={store.authUser.avatar} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <h1 className="text-gray-500 text-sm">Announce something to the students</h1>
            </div>
          )}
        </>
      )}
      <div className="border shadow rounded p-4 bg-[#F9F9F9]">
        <h1 className="text-center font-bold text-3xl mb-4">Announcements</h1>
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
          <div className="flex flex-col justify-center items-center gap-4">
            {announcements.map((announcement: any) => {
              return (
                <AnnoucementCard
                  key={announcement._id.toString()}
                  id={announcement._id}
                  title={announcement.title}
                  author={`${announcement.author.firstname} ${announcement.author.lastname}`}
                  creationDate={announcement.creationDate}
                  content={announcement.content}
                  images={announcement.images}
                  authorImage={announcement.author.avatar}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
