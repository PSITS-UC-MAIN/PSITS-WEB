import { jsx as _jsx } from "react/jsx-runtime";
import ProfileAvatar from "./ProfileAvatar";
const Topbar = () => {
    return (_jsx("div", { className: "p-4 bg-[#074873] w-full", children: _jsx("div", { className: "mx-10 py-2", children: _jsx("div", { className: "flex justify-end items-center", children: _jsx(ProfileAvatar, {}) }) }) }));
};
export default Topbar;
