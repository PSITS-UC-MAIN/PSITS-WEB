import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContextProvider } from "@/components/Context";

const Layout = () => {
  return (
    <ContextProvider>
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
    </ContextProvider>
  );
};

export default Layout;
