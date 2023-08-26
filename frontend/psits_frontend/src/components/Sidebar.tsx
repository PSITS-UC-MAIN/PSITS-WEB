import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { GaugeCircle, User, CalendarDays, ShoppingBasket } from "lucide-react";

const AdminSidebar = () => {
  const { pathname } = useLocation();

  return (
    <Sidebar className="h-screen" width="300px">
      <div className="p-5">
        <div className="flex flex-col items-center gap-2 mt-7 mb-12">
          <img src="/logo/psits_logo.png" className="w-[150px]" placeholder="logo" />
          <h1 className="font-semibold text-2xl">Admin Page</h1>
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
            icon={<GaugeCircle />}
            component={<Link to="/admin" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            active={pathname === "/admin/accounts" ? true : false}
            icon={<User />}
            component={<Link to="/admin/accounts" />}
          >
            Accounts
          </MenuItem>
          <MenuItem
            active={pathname === "/admin/events" ? true : false}
            icon={<CalendarDays />}
            component={<Link to="/admin/events" />}
          >
            Events
          </MenuItem>
          <MenuItem
            active={pathname === "/admin/merchandise" ? true : false}
            icon={<ShoppingBasket />}
            component={<Link to="/admin/merchandise" />}
          >
            Merchandise
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
