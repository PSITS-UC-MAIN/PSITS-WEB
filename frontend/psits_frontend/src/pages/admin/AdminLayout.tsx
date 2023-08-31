import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AdminTopbar from "@/components/Topbar";
import AdminSidebar from "@/components/Sidebar";
import useStore from "@/store";
import { useEffect } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const store = useStore();

  useEffect(() => {
    if (!store.authUser?.isAdmin) {
      toast.error("You are not authorize to access that site.");
      navigate("/");
      return;
    }
  }, []);

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
