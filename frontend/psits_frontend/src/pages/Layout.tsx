import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContextProvider } from "@/components/Context";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/user";
import useStore from "@/store";

const Layout = () => {
  const store = useStore();

  const {} = useQuery(["getCurrentUser"], getCurrentUser, {
    refetchOnWindowFocus: false,
    select(data) {
      return data;
    },
    onSuccess(data) {
      store.setAuthUser(data);
      store.setRequestLoading(false);
    },
    onError(error) {
      store.setRequestLoading(false);
      console.log(error);
    },
  });

  const user = store.authUser;

  return (
    <ContextProvider>
      <div className="flex flex-col">
        <Header data={user} />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ContextProvider>
  );
};

export default Layout;