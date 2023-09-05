import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
