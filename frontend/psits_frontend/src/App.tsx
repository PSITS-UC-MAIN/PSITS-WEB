import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Layout,
  Home,
  About,
  Events,
  Students,
  Merchandise,
  AdminDashboard,
  AdminAccounts,
  AdminLayout,
  Login,
  Register,
  ResetPassword,
  Error,
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
        path: "students",
        element: <Students />,
      },
      {
        path: "merchandise",
        element: <Merchandise />,
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
            path: "/admin/accounts",
            element: <AdminAccounts />,
          },
        ],
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
        path: "resetpassword",
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
  return <RouterProvider router={router} />;
};

export default App;
