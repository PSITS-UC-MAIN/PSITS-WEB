import Wrapper from "@/components/Wrapper";
import EventsTable from "@/components/tables/EventsTable";

const AdminEvents = () => {
  return (
    <Wrapper title="PSITS Admin | Events" noMargin>
      <EventsTable />
    </Wrapper>
  );
};

export default AdminEvents;
