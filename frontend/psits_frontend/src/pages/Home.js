import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Wrapper from "@/components/Wrapper";
import { homeBannerImages } from "@/constants";
import Announcement from "@/components/announcements/Announcement";
import Event from "@/components/events/Event";
import { useQuery } from "@tanstack/react-query";
import { getAllAnnouncement } from "@/api/announcement";
import { getAllEvents } from "@/api/event";
const Home = () => {
    const { data: announcementData, isLoading: announcementIsLoading, isError: announcementIsError, } = useQuery(["announcements"], getAllAnnouncement, {
        select(announcementData) {
            return announcementData.announcements;
        },
    });
    const { data: eventData, isLoading: eventIsLoading, isError: eventIsError, } = useQuery(["events"], getAllEvents, {
        select(eventData) {
            return eventData.events;
        },
    });
    return (_jsxs(Wrapper, { title: "PSITS | Home", className: "mt-10", children: [_jsx(Slide, { indicators: true, children: homeBannerImages.map((slideImage) => (_jsx("div", { className: "flex items-center justify-center rounded h-[500px] bg-contain bg-no-repeat bg-center", style: { backgroundImage: `url(${slideImage.banner})` } }, slideImage.name))) }), _jsxs("div", { className: "my-10 flex justify-center gap-4", children: [_jsx(Event, { events: eventData, isLoading: eventIsLoading, isError: eventIsError }), _jsx(Announcement, { announcements: announcementData, isLoading: announcementIsLoading, isError: announcementIsError })] })] }));
};
export default Home;
