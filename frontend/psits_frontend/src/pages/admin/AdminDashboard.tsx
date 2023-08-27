import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Tooltip, Area } from "recharts";

import Wrapper from "@/components/Wrapper";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";

const data = [
  { name: "January", sales: 1000 },
  { name: "Febuary", sales: 4000 },
  { name: "March", sales: 2000 },
  { name: "April", sales: 5000 },
  { name: "May", sales: 10000 },
  { name: "June", sales: 15000 },
  { name: "July", sales: 5000 },
  { name: "August", sales: 20000 },
  { name: "September", sales: 5000 },
];

const AdminDashboard = () => {
  return (
    <Wrapper title="PSITS Admin | Dashboard" noMargin>
      <div className=" flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <Card className="max-w-[250px] bg-gradient-to-r from-blue-400 to-cyan-400">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2 text-white">
                  <User strokeWidth={3} />
                  <span className="text-xl text-white">Total Earnings</span>
                </div>
                <Separator className="my-2" />
              </CardTitle>
              <div className="flex text-white items-center gap-2 justify-start">
                <h1 className="text-3xl text-white font-semibold">₱6969.00</h1>
              </div>
            </CardHeader>
          </Card>
          <Card className="max-w-[250px] bg-gradient-to-r from-orange-400 to-red-400">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2 text-white">
                  <User strokeWidth={3} />
                  <span className="text-xl text-white">Total Students</span>
                </div>
                <Separator className="my-2" />
              </CardTitle>
              <div className="flex text-white items-center gap-2 justify-start">
                <h1 className="text-3xl text-white font-semibold">+ 699</h1>
              </div>
            </CardHeader>
          </Card>
          <Card className="max-w-[250px] bg-gradient-to-r from-purple-400 to-pink-400">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2 text-white">
                  <User strokeWidth={3} />
                  <span className="text-xl text-white">Total Orders</span>
                </div>
                <Separator className="my-2" />
              </CardTitle>
              <div className="flex text-white items-center gap-2 justify-start">
                <h1 className="text-3xl text-white font-semibold">+ 20</h1>
              </div>
            </CardHeader>
          </Card>
        </div>
        <Card>
          <CardContent>
            <h1 className="mt-4 mb-2 text-2xl font-semibold text-">Monthly Revenue</h1>
            <Separator />
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart margin={{ top: 20 }} data={data}>
                <defs>
                  <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;
