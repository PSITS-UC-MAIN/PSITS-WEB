import Wrapper from "@/components/Wrapper";
import { psits_banner2 } from "@/assets";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const dummyData = [
  {
    id: 1,
    title: "PSITS: OATH TAKING",
    creationDate: "August 24, 2023",
    eventDate: "September 1, 2023",
    photo_img_link: psits_banner2,
    content:
      "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
  },
  {
    id: 2,
    title: "PSITS: OATH TAKING",
    creationDate: "August 24, 2023",
    eventDate: "September 1, 2023",
    photo_img_link: psits_banner2,
    content:
      "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
  },
  {
    id: 3,
    title: "PSITS: OATH TAKING",
    creationDate: "August 24, 2023",
    eventDate: "September 1, 2023",
    photo_img_link: psits_banner2,
    content:
      "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
  },
  {
    id: 4,
    title: "PSITS: OATH TAKING",
    creationDate: "August 24, 2023",
    eventDate: "September 1, 2023",
    photo_img_link: psits_banner2,
    content:
      "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
  },
  {
    id: 5,
    title: "PSITS: OATH TAKING",
    creationDate: "August 24, 2023",
    eventDate: "September 1, 2023",
    photo_img_link: psits_banner2,
    content:
      "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
  },
  {
    id: 6,
    title: "PSITS: OATH TAKING",
    creationDate: "August 24, 2023",
    eventDate: "September 1, 2023",
    photo_img_link: psits_banner2,
    content:
      "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
  },
  {
    id: 7,
    title: "PSITS: OATH TAKING",
    creationDate: "August 24, 2023",
    eventDate: "September 1, 2023",
    photo_img_link: psits_banner2,
    content:
      "This aims to:\nensure that all information and projects of the previous administration be turned over property to the incoming officers",
  },
];

const Events = () => {
  return (
    <Wrapper title="PSITS | Events" noMargin>
      <div className="flex flex-col gap-y-10 mb-20">
        <div className="text-2xl font-medium text-center text-white bg-[#548BA1] py-5">
          COLLEGE OF COMPUTER STUDIES LIST OF EVENTS
        </div>
        <div className="flex flex-row flex-wrap gap-5 justify-center mx-[150px]">
          {dummyData.map((item) => (
            <Card key={item.id} className="w-[300px] text-center">
              <img src={item.photo_img_link} alt="Event Image" className="rounded-md" />
              <CardContent>
                <h1 className="text-xl font-semibold uppercase my-5">{item.title}</h1>
                <p className="text-justify truncate">{item.content}</p>
              </CardContent>
              <CardFooter className="justify-center">
                <div className="flex flex-col">
                  <p className="text-[#074873] font-medium">{item.eventDate}</p>
                  <a href="#" className="underline">
                    View Full Context
                  </a>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Events;
