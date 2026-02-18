import { j as r } from "../jsx-runtime.js";
import "react";
import { useLocation as a, Navigate as n } from "react-router-dom";
import { useAuthStore as m } from "../stores/auth-store.js";
const c = (e, t) => !t || t.length === 0 ? !0 : t.some((o) => e.includes(o));
function d({ children: e, requiresAuth: t = !0, requiredRoles: o }) {
  const u = a(), { isAuthenticated: i, roles: s } = m();
  return t && !i ? /* @__PURE__ */ r.jsx(n, { to: "/login", state: { from: u }, replace: !0 }) : t && !c(s, o) ? /* @__PURE__ */ r.jsx(n, { to: "/forbidden", replace: !0 }) : /* @__PURE__ */ r.jsx(r.Fragment, { children: e });
}
export {
  d as default
};
