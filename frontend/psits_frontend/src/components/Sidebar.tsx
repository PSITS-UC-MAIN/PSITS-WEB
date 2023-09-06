import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { User, CalendarDays, ShoppingBasket, PanelLeft, BarChartBig, Package2, PartyPopper } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const AdminSidebar = () => {
  const { pathname } = useLocation();

  return (
    <Sidebar width="300px">
      <div className="p-5">
        <div className="flex flex-col items-center gap-2 mb-12">
          <img src="/logo/psits_logo.png" className="w-[150px]" placeholder="logo" />
          <h1 className="font-bold text-[#252525] text-2xl">Admin Page</h1>
        </div>
        <Menu
          menuItemStyles={{
            button: ({ active }) => {
              return {
                color: active ? "#454545" : "",
                fontWeight: active ? "600" : "",
                borderRadius: "2px",
              };
            },
          }}
          rootStyles={{
            [`.${menuClasses.icon}`]: {
              color: "#000000",
            },
            [`.${menuClasses.menuItemRoot}`]: {
              color: "#526D82",
              fontSize: "16px",
            },
          }}
        >
          <p className=" font-medium text-sm">Main</p>
          <MenuItem
            active={pathname === "/admin" ? true : false}
            icon={<BarChartBig />}
            component={<Link to="/admin" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            active={pathname === "/admin/merchandise" ? true : false}
            icon={<ShoppingBasket />}
            component={<Link to="/admin/merchandise" />}
          >
            Merchandise
          </MenuItem>
          <MenuItem
            active={pathname === "/admin/orders" ? true : false}
            icon={<Package2 />}
            component={<Link to="/admin/orders" />}
          >
            Orders
          </MenuItem>
          <MenuItem
            active={pathname === "/admin/accounts" ? true : false}
            icon={<User />}
            component={<Link to="/admin/accounts" />}
          >
            Accounts
          </MenuItem>
          <MenuItem
            active={pathname === "/admin/announcements" ? true : false}
            icon={<PartyPopper />}
            component={<Link to="/admin/announcements" />}
          >
            Announcements
          </MenuItem>
          <MenuItem
            active={pathname === "/admin/events" ? true : false}
            icon={<CalendarDays />}
            component={<Link to="/admin/events" />}
          >
            Events
          </MenuItem>
          <Separator className="my-4" />
          <MenuItem icon={<PanelLeft />} component={<Link to="/" />}>
            Exit
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
