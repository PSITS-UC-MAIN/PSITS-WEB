import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
const Wrapper = ({ className, noMargin, children, title, }) => {
    useEffect(() => {
        document.title = title; // Update the document title
        window.scrollTo(0, 0);
    }, [title]);
    return _jsx("section", { className: `${className} ${noMargin ? "" : "lg:mx-[150px]"}`, children: children });
};
export default Wrapper;
