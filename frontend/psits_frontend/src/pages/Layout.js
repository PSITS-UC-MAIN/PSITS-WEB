import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(ContextProvider, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx(Header, { data: user }), _jsx("div", { className: "min-h-screen", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }) }));
};
export default Layout;
