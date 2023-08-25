import Wrapper from "@/components/Wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dummyData = [
  {
    id: 2324,
    name: "Jayharron Mar Abejar",
    position: "Project Owner",
  },
  {
    id: 2325,
    name: "Kean Jieden Villaflor",
    position: "Team Lead",
  },
  {
    id: 2326,
    name: "Darelle Gochuico",
    position: "Volunteer",
  },
];

const Developers = () => {
  return (
    <Wrapper title="PSTIS | Officers">
      <div className="m-20">
        <h1 className="text-4xl font-medium mb-4 text-[#074873]">DEVELOPERS</h1>
        <div className="flex gap-4 flex-wrap justify-center">
          {dummyData.map((data) => {
            return (
              <Card key={data.id} className="w-[300px] text-center">
                <CardHeader>
                  <CardTitle>
                    <div className="bg-gray-200 h-[200px] rounded" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="uppercase">
                  <h1 className="text-xl font-semibold">{data.name}</h1>
                  <p className="text-[#074873] font-medium">{data.position}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default Developers;
