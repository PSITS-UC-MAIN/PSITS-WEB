import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Wrapper from "@/components/Wrapper";
import { Slide } from "react-slideshow-image";
import { homeBannerImages } from "@/constants";
import { psits_banner2 } from "@/assets";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
const dummyData = [
    {
        id: 1,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
    },
    {
        id: 2,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
    },
    {
        id: 3,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
    },
    {
        id: 4,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
    },
    {
        id: 5,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
    },
    {
        id: 6,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
    },
    {
        id: 7,
        title: "PSITS: OATH TAKING",
        creationDate: "August 24, 2023",
        eventDate: "September 1, 2023",
        photo_img_link: psits_banner2,
        content: "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
    },
];
const Events = () => {
    return (_jsxs(Wrapper, { title: "PSITS | Events", noMargin: true, children: [_jsx("div", { className: "my-10 mx-[150px]", children: _jsx(Slide, { indicators: true, children: homeBannerImages.map((slideImage) => (_jsx("div", { className: "flex items-center justify-center rounded h-[500px] bg-contain bg-no-repeat bg-center", style: { backgroundImage: `url(${slideImage.banner})` } }, slideImage.name))) }) }), _jsxs("div", { className: "flex flex-col gap-y-10 mb-20", children: [_jsx("div", { className: "text-2xl font-medium text-center text-white bg-[#548BA1] py-5", children: "COLLEGE OF COMPUTER STUDIES LIST OF EVENTS" }), _jsx("div", { className: "flex flex-row flex-wrap gap-5 justify-center mx-[150px]", children: dummyData.map((item) => (_jsxs(Card, { className: "w-[300px] text-center", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: _jsx("img", { src: item.photo_img_link, alt: "Event Image", className: "rounded-md" }) }) }), _jsxs(CardContent, { children: [_jsx("h1", { className: "text-xl font-semibold uppercase mb-5", children: item.title }), _jsx("p", { className: "text-justify truncate", children: item.content })] }), _jsx(CardFooter, { className: "justify-center", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { className: "text-[#074873] font-medium", children: item.eventDate }), _jsx("a", { href: "#", className: "underline", children: "View Full Context" })] }) })] }, item.id))) })] })] }));
};
export default Events;
