import { Outlet } from "react-router-dom";

import AdminTopbar from "@/components/Topbar";
import AdminSidebar from "@/components/Sidebar";

const AdminLayout = () => {
  return (
    <section className="flex h-screen">
      <AdminSidebar />
      <div className="w-full">
        <AdminTopbar />
        <div className="m-10">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;
