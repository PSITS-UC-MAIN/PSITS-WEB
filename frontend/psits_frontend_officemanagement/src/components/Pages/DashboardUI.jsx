import React, { useEffect, useState } from "react";
import Header from "../Header";
import { AppData } from "../../utilities/server_utils";
import { CheckAuthTokenExpired } from "../../database/api_service";
import Profile from "../Cards/Profile";
import Panel from "../Group/Panel";
import AdminDashboard from "../Cards/AdminDashboard";

function DashboardUI() {
  const [appData, setAppData] = useState(AppData());

  useEffect(() => {
    async function verify(app_Data) {
      if (!app_Data) {
        window.location.href = "/psits-officemanagement/login";
      }
    }
    verify(appData);
  }, []);

  return (
    <div>
      <Header />
      {appData ? (
        <>
          <Panel className={"flex-container marginAuto"}>
            <Profile className={"marginAutoExceptTop"} user={appData.user} />
            <AdminDashboard className={"marginAutoExceptTop"} />
          </Panel>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default DashboardUI;
