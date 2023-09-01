import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardUI from "./components/Pages/DashboardUI.jsx";
import TimeLogUI from "./components/Pages/TimeLogUI.jsx";
import LoginUI from "./components/Pages/LoginUI.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboardUI />,
      },
      {
        path: "/timelog",
        element: <TimeLogUI />,
      },
      {
        path: "/login",
        element: <LoginUI />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
