import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { format, parseISO } from "date-fns";
import { getAllAnnouncement } from "@/api/announcement";

const AnnouncementsTable = () => {
  const { data, isLoading, isError } = useQuery(["adannouncements"], getAllAnnouncement, {
    select(announcementData) {
      return announcementData.announcements;
    },
  });

  if (isLoading) return <div>Loading...</div>;

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
      </Table>
    </div>
  );
};

export default AnnouncementsTable;
