import Wrapper from "@/components/Wrapper";
import AccountsTable from "@/components/tables/AccountsTable";

const AdminAccounts = () => {
  return (
    <Wrapper title="PSITS Admin | Accounts" noMargin>
      <AccountsTable />
    </Wrapper>
  );
};

export default AdminAccounts;
