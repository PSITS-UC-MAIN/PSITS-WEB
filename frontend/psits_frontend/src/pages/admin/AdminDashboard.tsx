import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Tooltip, Area } from "recharts";

import Wrapper from "@/components/Wrapper";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Banknote, Bell, CalendarCheck, Loader2Icon, Shirt, ShoppingBag, User } from "lucide-react";
import { getAllStats } from "@/api/stat";
import { useQuery } from "@tanstack/react-query";

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
  const {
    data: serverStats,
    isLoading,
    isError,
  } = useQuery(["stats"], getAllStats, {
    select(serverStats) {
      return serverStats;
    },
  });

  return (
    <Wrapper title="PSITS Admin | Dashboard" noMargin>
      <div className=" flex flex-col gap-10">
        {isLoading ? (
          <span className="text-center flex justify-center">
            <Loader2Icon className="animate-spin" />
          </span>
        ) : isError ? (
          <div className="flex items-center gap-2 text-red-500  justify-center">
            <AlertCircle />
            <p>Something went wrong!</p>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Card className="max-w-[250px] bg-gradient-to-r from-blue-400 to-cyan-400">
              <CardHeader className="p-4">
                <CardTitle>
                  <div className="flex items-center gap-2 text-white">
                    <Banknote strokeWidth={3} />
                    <span className="text-lg text-white">Total Earnings</span>
                  </div>
                  <Separator className="my-2" />
                </CardTitle>
                <div className="flex text-white items-center gap-2 justify-start">
                  <h1 className="text-2xl text-white font-semibold">₱{serverStats.totalEarnings.toFixed(2)}</h1>
                </div>
              </CardHeader>
            </Card>
            <Card className="max-w-[250px] bg-gradient-to-r from-orange-400 to-red-400">
              <CardHeader className="p-4">
                <CardTitle>
                  <div className="flex items-center gap-2 text-white">
                    <User strokeWidth={3} />
                    <span className="text-lg text-white">Students</span>
                  </div>
                  <Separator className="my-2" />
                </CardTitle>
                <div className="flex text-white items-center gap-2 justify-start">
                  <h1 className="text-2xl text-white font-semibold">{serverStats.users}</h1>
                </div>
              </CardHeader>
            </Card>
            <Card className="max-w-[250px] bg-gradient-to-r from-purple-400 to-pink-400">
              <CardHeader className="p-4">
                <CardTitle>
                  <div className="flex items-center gap-2 text-white">
                    <ShoppingBag strokeWidth={3} />
                    <span className="text-lg text-white">Orders</span>
                  </div>
                  <Separator className="my-2" />
                </CardTitle>
                <div className="flex text-white items-center gap-2 justify-start">
                  <h1 className="text-2xl text-white font-semibold">{serverStats.orders}</h1>
                </div>
              </CardHeader>
            </Card>
            <Card className="max-w-[250px] bg-gradient-to-r from-[#ee2a7b] to-[#ff00d4]">
              <CardHeader className="p-4">
                <CardTitle>
                  <div className="flex items-center gap-2 text-white">
                    <Shirt strokeWidth={3} />
                    <span className="text-lg text-white">Merchandise</span>
                  </div>
                  <Separator className="my-2" />
                </CardTitle>
                <div className="flex text-white items-center gap-2 justify-start">
                  <h1 className="text-2xl text-white font-semibold">{serverStats.merchandise}</h1>
                </div>
              </CardHeader>
            </Card>
            <Card className="max-w-[400px] bg-gradient-to-r from-[#00a1ff] to-[#00ff8f]">
              <CardHeader className="p-4">
                <CardTitle>
                  <div className="flex items-center gap-2 text-white">
                    <Bell strokeWidth={3} />
                    <span className="text-lg text-white">Announcements</span>
                  </div>
                  <Separator className="my-2" />
                </CardTitle>
                <div className="flex text-white items-center gap-2 justify-start">
                  <h1 className="text-2xl text-white font-semibold">{serverStats.announcements}</h1>
                </div>
              </CardHeader>
            </Card>
            <Card className="max-w-[400px] bg-gradient-to-r from-[#7f00ff] to-[#e100ff]">
              <CardHeader className="p-4">
                <CardTitle>
                  <div className="flex items-center gap-2 text-white">
                    <CalendarCheck strokeWidth={3} />
                    <span className="text-lg text-white">Events</span>
                  </div>
                  <Separator className="my-2" />
                </CardTitle>
                <div className="flex text-white items-center gap-2 justify-start">
                  <h1 className="text-2xl text-white font-semibold">{serverStats.events}</h1>
                </div>
              </CardHeader>
            </Card>
          </div>
        )}
        <Card>
          <CardContent className="p-4">
            <h1 className="mb-2 text-xl font-semibold text-">Monthly Revenue</h1>
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
