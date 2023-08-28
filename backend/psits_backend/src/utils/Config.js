import * as dotenv from "dotenv";
dotenv.config();

const config = {
  DATABASE_URL:
    process.env.DATABASE_URL ?? "mongodb://127.0.0.1:27017/PSITS_DB",
  PORT: process.env.PORT ?? 80,
  PROFILE_IMG_DEFAULT:
    process.env.PROFILE_IMG_DEFAULT ??
    "https://cdn-icons-png.flaticon.com/512/847/847969.png?w=826&t=st=1691641237~exp=1691641837~hmac=6371e3f2acfbe7c141349f0c1a8ea64a846ef79be69c39ab7cd6ba738f0ef556",
  API_KEYS: process.env.API_KEYS,
  getAPI_KEYS() {
    return this.API_KEYS.split(",");
  },
};

export default config;
