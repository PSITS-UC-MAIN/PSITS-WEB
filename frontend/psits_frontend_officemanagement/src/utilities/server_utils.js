import {
  AuthenticateUser,
  GetTimeLogs,
  GetUserDataCurrent,
  LogoutUser,
} from "../database/api_service";
import { User } from "../models/user";

export const LoginUser = async ({ rfid, password }) => {
  const { StatusCode, token } = await AuthenticateUser({ rfid, password });

  /*
    200 - success
    400 - bad request
    409 - invalid login
  */
  if (StatusCode === 200) {
    document.cookie = `token=${token}`;
    const user = await GetUserDataCurrent();
    window.localStorage.setItem("app_user_data", JSON.stringify(user));
    return { StatusCode, Message: "Login Successful!" };
  } else if (StatusCode === 409) {
    return { StatusCode, Message: "Invalid Credentials!" };
  }
  return { StatusCode, Message: "Login Error!" };
};

export const AppData = () => {
  let retrievedInfo = window.localStorage.getItem("app_user_data");
  if (!retrievedInfo) return null;
  const user = JSON.parse(retrievedInfo);
  return { user: new User(user) };
};

export const ClearAppData = () => {
  window.localStorage.removeItem("app_user_data");
  LogoutUser();
  delete_cookie("token", "", "");
};

export const Get5DaysBefore = async (dateNow = new Date()) => {
  const dateNowCopy = dateNow;
  const day1 = new Date(
    new Date(dateNowCopy.setHours(0, 0, 0, 0))
  ).toISOString();
  const day2 = new Date(
    new Date(dateNowCopy).setHours(-24, 0, 0, 0)
  ).toISOString();
  const day3 = new Date(
    new Date(dateNowCopy).setHours(-48, 0, 0, 0)
  ).toISOString();
  const day4 = new Date(
    new Date(dateNowCopy).setHours(-72, 0, 0, 0)
  ).toISOString();
  const day5 = new Date(
    new Date(dateNowCopy).setHours(-96, 0, 0, 0)
  ).toISOString();

  const day1_result = await GetTimeLogs(
    day1,
    new Date(dateNowCopy.setHours(24, 0, 0, 0)).toISOString()
  );
  const day2_result = await GetTimeLogs(day2, day1);
  const day3_result = await GetTimeLogs(day3, day2);
  const day4_result = await GetTimeLogs(day4, day3);
  const day5_result = await GetTimeLogs(day5, day4);

  return {
    _1: {
      date: day1,
      day1_result,
    },
    _2: {
      date: day2,
      day2_result,
    },
    _3: {
      date: day3,
      day3_result,
    },
    _4: {
      date: day4,
      day4_result,
    },
    _5: {
      date: day5,
      day5_result,
    },
  };
};
function get_cookie(name) {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
}

export function delete_cookie(name, path, domain) {
  if (get_cookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

export const getMinimumDateLogged = async () => {
  const logs = await GetTimeLogs(
    new Date("2023-08-09").toISOString(),
    new Date().toISOString()
  );
  const log = logs[logs.length - 1];
  return new Date(log.loginTime);
};

export const DownloadCSV = (data) => {
  console.log(data);
  let csv = "";
  for (const obj in data) {
    csv += "Date: " + data[obj].date.split("T")[0] + "\n";
    for (const resKey in data[obj]) {
      if (resKey === "date") continue;
      for (const log of data[obj][resKey]) {
        let str = `${log.user.firstname} ${log.user.lastname},login: ${
          log.loginTime.split("T")[0] +
          " " +
          new Date(log.loginTime).toLocaleTimeString()
        },logout: ${
          log.logoutTime.split("T")[0] +
          " " +
          new Date(log.logoutTime).toLocaleTimeString()
        },remark:${log.remarks}`;
        csv += str + "\n";
      }
    }
  }

  console.log(csv);

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(csv);
  var dlAnchorElem = document.createElement("a");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `timelogs-${new Date().getTime()}.csv`);
  dlAnchorElem.click();
  dlAnchorElem.remove();
};
