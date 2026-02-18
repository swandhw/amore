import u, { AxiosHeaders as d } from "axios";
import { useAuthStore as n } from "../stores/auth-store.js";
const i = u.create({
  baseURL: "/api/bff",
  withCredentials: !1
}), f = u.create({
  baseURL: "/api/bff",
  withCredentials: !0
});
let a = null;
const w = async () => {
  const t = await f.post("/auth/refresh"), { accessToken: e, user: r, roles: s } = t.data;
  return n.getState().setAccessToken(e), n.getState().setUser(r, s), e;
};
i.interceptors.request.use((t) => {
  const { accessToken: e } = n.getState();
  return e && (t.headers = d.from({
    ...t.headers,
    Authorization: `Bearer ${e}`
  })), t;
});
i.interceptors.response.use(
  (t) => t,
  async (t) => {
    const e = t.config, r = "/auth/refresh", s = e?.url ?? "", c = s.includes(r), h = s.includes("redirect"), { accessToken: p } = n.getState();
    if (!e || t.response?.status !== 401)
      return Promise.reject(t);
    if (!p || h || c || e._retry) {
      n.getState().reset();
      const o = window.location.pathname + window.location.search;
      return window.location.assign(`/login?redirect=${encodeURIComponent(o)}`), Promise.reject(t);
    }
    a || (a = w());
    try {
      const o = await a;
      return a = null, e._retry = !0, e.headers = d.from({
        ...e.headers,
        Authorization: `Bearer ${o}`
      }), i(e);
    } catch (o) {
      a = null, n.getState().reset();
      const l = window.location.pathname + window.location.search;
      return window.location.assign(`/login?redirect=${encodeURIComponent(l)}`), Promise.reject(o);
    }
  }
);
function m(t) {
  const e = new URLSearchParams();
  return Object.entries(t).forEach(([r, s]) => {
    s != null && s !== "" && e.append(r, String(s));
  }), e.toString();
}
async function S(t, e) {
  return (await i.get(e ? `${t}?${m(e)}` : t)).data;
}
async function y(t, e, r) {
  const s = {
    [e]: r
  };
  return (await i.post(t, s)).data;
}
export {
  S as apiGet,
  y as apiPost,
  i as default
};
