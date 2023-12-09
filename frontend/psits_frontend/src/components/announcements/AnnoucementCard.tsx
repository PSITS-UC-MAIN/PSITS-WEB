import { format, parseISO } from "date-fns";
import ReackMarkDown from "react-markdown";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { Slide } from "react-slideshow-image";

import { deleteAnnouncementById, updateAnnouncementById } from "@/api/announcement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FileEdit, Loader2, Trash2, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import useStore from "@/store";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface AnnouncementCardProps {
  id: string;
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
  authorImage: string;
}

const AnnouncementSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(4),
});

type AnnouncementSchema = z.infer<typeof AnnouncementSchema>;

const AnnoucementCard = ({ id, title, author, content, creationDate, images, authorImage }: AnnouncementCardProps) => {
  const store = useStore();
  const queryClient = useQueryClient();
  const parseDate = creationDate.toLocaleString();
  const formattedDate = format(parseISO(parseDate), "PPP | pp");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetUpdateForm,
  } = useForm<AnnouncementSchema>({
    resolver: zodResolver(AnnouncementSchema),
  });

  // update annoucement
  const { mutate: update, isLoading: updateIsLoading } = useMutation({
    mutationFn: updateAnnouncementById,
    onMutate() {
      store.setRequestLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["announcements"]);
      store.setRequestLoading(false);
      toast.success(`${data.message}!`, {
        position: "bottom-right",
      });
      resetUpdateForm();
    },
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.response.data.message || error.message);
    },
  });

  const onEditSubmit: SubmitHandler<AnnouncementSchema> = (data) => {
    update({ announcementId: id, data });
  };

  // delete announcement
  const { mutate, reset } = useMutation({
    mutationFn: deleteAnnouncementById,
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
    },
    onError(error: any) {
      store.setRequestLoading(false);
      toast.error(error.response.data.message || error.message);
    },
  });

  return (
    <Card className="w-[90%]  xl:max-w-[700px]">
      <div className="relevant bg-[#074873] w-full h-[10px] rounded-t-md" />
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={authorImage} className="rounded-full object-cover w-[50px] h-[50px]" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{author}</span>
              <span className="font-light text-sm">{formattedDate}</span>
            </div>
          </div>
          {store.authUser?.isAdmin && (
            <div className="flex items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <FileEdit size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleSubmit(onEditSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Edit Announcement</DialogTitle>
                      <DialogDescription>
                        Make changes to the announcement. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid items-center gap-4">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" className="col-span-3" defaultValue={title} {...register("title")} />
                        {errors.title && <p className="text-red-400 text-sm font-light">{errors.title.message}</p>}
                      </div>
                      <div className="grid items-center gap-4">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          rows={5}
                          defaultValue={content}
                          className="bg-[#fafafa]"
                          {...register("content")}
                        />
                        {errors.content && <p className="text-red-400 text-sm font-light">{errors.content.message}</p>}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-[#268EA7] hover:bg-[#3da7c2]" disabled={updateIsLoading}>
                        {updateIsLoading ? <Loader2 className=" animate-spin" /> : "Save changes"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
                      This action cannot be undone. This will permanently delete the annoucement and remove the data
                      from the server.
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
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="break-words">
        <CardTitle>
          <Separator className="mb-5" />
          {title}
        </CardTitle>
        <ReackMarkDown
          children={content}
          className="markdown text-light font-light text-gray-700"
          allowedElements={["p", "br", "strong", "em", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li"]}
        />
        <div className="max-h-[650px]">
          {images.length > 1 ? (
            <Slide indicators>
              {images.map((slideImage) => (
                <img
                  key={slideImage.imagePublicId}
                  src={slideImage.image}
                  className="flex items-center justify-center rounded object-contain"
                />
              ))}
            </Slide>
          ) : (
            <div className="flex justify-center max-h-600">
              {images[0] && (
                <img src={images[0].image} alt="image" className="rounded h-full object-contain object-center" />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnoucementCard;
