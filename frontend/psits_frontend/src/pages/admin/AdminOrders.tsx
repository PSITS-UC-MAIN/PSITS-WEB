import Wrapper from "@/components/Wrapper";
import OrdersTable from "@/components/tables/OrdersTables";

const AdminOrders = () => {
  return (
    <Wrapper title="PSITS Admin | Orders" noMargin>
      <OrdersTable/>
    </Wrapper>
  );
};

export default AdminOrders;
