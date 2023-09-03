import { OfficeLog } from "../models/officeLogs";
import { User } from "../models/user";
import { app_config } from "../utilities/config";

export const AuthenticateUser = async ({ rfid, password, API_KEY }) => {
  const res = await fetch("/api/v2/auth/login/rfid", {
    method: "POST",
    credentials: "include",
    headers: {
      API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rfid: rfid,
      password,
    }),
  });

  const status = res.status;

  return status;
};

export const LogoutUser = async () => {
  const res = await fetch("/api/auth/logout");

  const status = res.status;

  return status;
};

export const GetUserDataCurrent = async () => {
  const res = await fetch("/api/user/current-user", {
    method: "GET",
    credentials: "include",
  });

  const { user } = await res.json();

  return new User(user);
};

export const GetUserDataById = async (UserID) => {
  const res = await fetch(app_config.API_URL + "/user/" + UserID, {
    method: "GET",
    credentials: "include",
  });

  const { user } = await res.json();

  return new User(user);
};

export const CheckAuthTokenExpired = async (AuthToken) => {
  const res = await fetch(app_config.API_URL + "/auth/validate", {
    headers: {
      AuthToken,
    },
  });
  const { IsExpired, StatusCode } = await res.json();
  if (StatusCode === 403) return true;
  return !!IsExpired;
};

export const GetTimeLogs = async (
  min = new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
  max = new Date().toISOString()
) => {
  const res = await fetch("/api/officelog", {
    credentials: "include",
    headers: {
      option: "latest",
      minval: min,
      maxval: max,
    },
  });
  const StatusCode = res.status;
  const { officeLogs } = await res.json();

  if (StatusCode === 401) return [];

  officeLogs.sort((a, b) => {
    return new Date(b.loginTime) - new Date(a.loginTime);
  });
  return officeLogs;
};

export const OfficeLogOff = async () => {
  const res = await fetch("/api/officelog", {
    method: "PATCH",
    credentials: "include",
  });

  const StatusCode = res.status;
  return StatusCode;
};

export const OfficeLogIn = async (reason) => {
  const res = await fetch("/api/officelog", {
    method: "POST",
    credentials: "include",
    headers: {
      API_KEY: app_config.API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      remarks: reason,
    }),
  });

  const StatusCode = await res.status;
  return StatusCode;
};
