import Wrapper from "@/components/Wrapper";
import { psits_banner2 } from "@/assets";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
];

const Events = () => {
  return (
    <Wrapper title="PSITS | Events">
      <div className="flex flex-col gap-y-10 mt-10 mb-20">
        <div className="flex flex-wrap gap-4 justify-center">
          {dummyData.map((item) => (
            <Card key={item.id} className="w-[800px] h-[350px] flex ">
              <div className="h-full bg-blue-600 w-[200px] rounded-l" />
              <div>
                <CardHeader>
                  <h1 className="text-3xl font-bold uppercase">{item.title}</h1>
                  <h1 className="text-lg text-slate-700 ">{item.eventDate}</h1>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <p className="text-justify">{item.content}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Events;
