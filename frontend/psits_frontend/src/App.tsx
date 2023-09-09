import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/user";
import useStore from "@/store";

import {
  Layout,
  Home,
  About,
  Events,
  CommunityLayout,
  Students,
  Faculty,
  Officers,
  Developers,
  MerchLayout,
  Merchandise,
  ViewSingleMerchandise,
  AdminEvents,
  AdminOrders,
  AdminMerchandise,
  AdminDashboard,
  AdminAccounts,
  AdminLayout,
  Profile,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
  Error,
  AdminAnnouncements,
} from "./pages";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "community",
        element: <CommunityLayout />,
        children: [
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "faculty",
            element: <Faculty />,
          },
          {
            path: "officers",
            element: <Officers />,
          },
          {
            path: "developers",
            element: <Developers />,
          },
        ],
      },
      {
        path: "merchandise",
        element: <MerchLayout />,
        children: [
          {
            index: true,
            element: <Merchandise />,
          },
          {
            path: ":merchId",
            element: <ViewSingleMerchandise />,
          },
        ],
      },
      {
        path: "orders/:userId",
        element: <Orders />,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "accounts",
            element: <AdminAccounts />,
          },
          {
            path: "events",
            element: <AdminEvents />,
          },
          {
            path: "announcements",
            element: <AdminAnnouncements />,
          },
          {
            path: "merchandise",
            element: <AdminMerchandise />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
        ],
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:userId/:token",
        element: <ResetPassword />,
      },
      {
        path: "error",
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  const store = useStore();

  useQuery(["getCurrentUser"], getCurrentUser, {
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

  return <RouterProvider router={router} />;
};

export default App;
