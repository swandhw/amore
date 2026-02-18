import o from "axios";
import s from "../httpClient.js";
const a = async (t) => (await s.post("/auth/login", t)).data, i = async () => (await o.post(
  "/api/bff/auth/refresh",
  void 0,
  {
    withCredentials: !0
  }
)).data, p = async () => (await s.post("/auth/logout")).data;
export {
  a as login,
  p as logout,
  i as refreshSession
};
