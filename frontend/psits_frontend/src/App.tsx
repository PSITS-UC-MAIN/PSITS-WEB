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
  Orders,
  ViewSingleMerchandise,
  AdminEvents,
  AdminOrders,
  AdminRoutes,
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
            index: true,
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
            path: ":merchandiseItemId",
            element: <ViewSingleMerchandise />,
          },
        ],
      },
      {
        path: "orders",
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
          {
            path: "routes",
            element: <AdminRoutes />,
          },
        ],
      },
      {
        path: "profile",
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
