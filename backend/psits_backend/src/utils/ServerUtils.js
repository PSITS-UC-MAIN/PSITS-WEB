import crypto from "crypto";
import UsersModel from "../models/UserModel.js";
import User from "../classesDTO/User.js";
import Announcement from "../classesDTO/Announcement.js";

async function SHA512(str) {
  return crypto.subtle
    .digest("SHA-512", new TextEncoder("utf-8").encode(str))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    });
}

async function GetSHA512(str) {
  return await SHA512(str);
}

function EncapulateUser(user) {
  return new User(user);
}

async function ParseAnnouncement(announcement) {
  const user = await UsersModel.findById(announcement.author);
  return new Announcement(announcement, EncapulateUser(user));
}

function GenerateRandom(min, max) {
  let rand = Math.floor(Math.random() * max);

  if (rand < min) return GenerateRandom(min, max);
  return rand;
}

function GenerateRandomLetter() {
  let arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  return arr[GenerateRandom(0, arr.length)];
}

function GenerateReference() {
  return `PSITS_${GenerateRandom(
    10000000,
    99999999
  )}${GenerateRandomLetter()}${GenerateRandom(
    1000,
    9999
  )}${GenerateRandomLetter()}${GenerateRandomLetter()}${GenerateRandomLetter()}`;
}

export {
  SHA512,
  GetSHA512,
  EncapulateUser,
  ParseAnnouncement,
  GenerateReference,
  GenerateRandomLetter,
  GenerateRandom,
};
