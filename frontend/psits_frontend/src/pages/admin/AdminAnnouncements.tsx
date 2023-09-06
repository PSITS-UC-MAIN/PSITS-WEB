import Wrapper from "@/components/Wrapper";
import AnnouncementsTable from "@/components/tables/AnnouncementsTable";

const AdminAnnouncements = () => {
  return (
    <Wrapper title="PSITS Admin | Announcements" noMargin>
      <AnnouncementsTable />
    </Wrapper>
  );
};

export default AdminAnnouncements;
