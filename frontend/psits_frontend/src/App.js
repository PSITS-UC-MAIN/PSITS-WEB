import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, Home, About, Events, StudentLayout, Students, Officers, Developers, Merchandise, AdminEvents, AdminMerchandise, AdminDashboard, AdminAccounts, AdminLayout, Profile, Login, Register, ResetPassword, Error, } from "./pages";
const router = createBrowserRouter([
    {
        element: _jsx(Layout, {}),
        path: "/",
        errorElement: _jsx(Error, {}),
        children: [
            {
                index: true,
                element: _jsx(Home, {}),
            },
            {
                path: "about",
                element: _jsx(About, {}),
            },
            {
                path: "events",
                element: _jsx(Events, {}),
            },
            {
                path: "students",
                element: _jsx(StudentLayout, {}),
                children: [
                    {
                        index: true,
                        element: _jsx(Students, {}),
                    },
                    {
                        path: "officers",
                        element: _jsx(Officers, {}),
                    },
                    {
                        path: "developers",
                        element: _jsx(Developers, {}),
                    },
                ],
            },
            {
                path: "merchandise",
                element: _jsx(Merchandise, {}),
            },
            {
                path: "admin",
                element: _jsx(AdminLayout, {}),
                children: [
                    {
                        index: true,
                        element: _jsx(AdminDashboard, {}),
                    },
                    {
                        path: "accounts",
                        element: _jsx(AdminAccounts, {}),
                    },
                    {
                        path: "events",
                        element: _jsx(AdminEvents, {}),
                    },
                    {
                        path: "merchandise",
                        element: _jsx(AdminMerchandise, {}),
                    },
                ],
            },
            {
                path: "profile/:userId",
                element: _jsx(Profile, {}),
            },
            {
                path: "login",
                element: _jsx(Login, {}),
            },
            {
                path: "register",
                element: _jsx(Register, {}),
            },
            {
                path: "resetpassword",
                element: _jsx(ResetPassword, {}),
            },
            {
                path: "error",
                element: _jsx(Error, {}),
            },
        ],
    },
]);
const App = () => {
    return _jsx(RouterProvider, { router: router });
};
export default App;
