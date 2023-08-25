import { Outlet } from "react-router-dom";

import AdminSidebar from "@/components/Sidebar";

const AdminLayout = () => {
  return (
    <section className="flex">
      <AdminSidebar />
      <Outlet />
    </section>
  );
};

export default AdminLayout;
