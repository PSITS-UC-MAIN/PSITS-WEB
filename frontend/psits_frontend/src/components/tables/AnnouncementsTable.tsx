import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { format, parseISO } from "date-fns";
import { getAllAnnouncement } from "@/api/announcement";
import { AlertCircle, Loader2Icon } from "lucide-react";

const AnnouncementsTable = () => {
  const { data, isLoading, isError } = useQuery(["adannouncements"], getAllAnnouncement, {
    select(announcementData) {
      return announcementData.announcements;
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of announcements.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Creation Date</TableHead>
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
            {data?.map((announcement: any) => {
              const parseCreationDate = announcement.creationDate.toLocaleString();
              const formattedCreationDate = format(parseISO(parseCreationDate), "PPP");

              return (
                <TableRow key={announcement._id}>
                  <TableCell>{`${announcement.author.firstname} ${announcement.author.lastname}`}</TableCell>
                  <TableCell>{formattedCreationDate}</TableCell>
                  <TableCell>{announcement.title}</TableCell>
                  <TableCell>{announcement.content}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default AnnouncementsTable;
