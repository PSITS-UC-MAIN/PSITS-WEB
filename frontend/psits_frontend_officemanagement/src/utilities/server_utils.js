import {
  AuthenticateUser,
  GetTimeLogs,
  GetUserDataCurrent,
  LogoutUser,
} from "../database/api_service";
import { User } from "../models/user";

export const LoginUser = async ({ rfid, password }) => {
  const StatusCode = await AuthenticateUser({ rfid, password });

  /*
    200 - success
    400 - bad request
    409 - invalid login
  */
  const user = await GetUserDataCurrent();

  if (StatusCode === 200) {
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
