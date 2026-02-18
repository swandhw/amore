import { j as e } from "../jsx-runtime.js";
import { Routes as u, Route as r, Navigate as a } from "react-router-dom";
import { useAppRoutes as n } from "../hooks/useAppRoutes.js";
import { useAuthBootstrap as m } from "../hooks/useAuthBootstrap.js";
import { useAuthStore as d } from "../stores/auth-store.js";
import h from "./RouteGuard.js";
function j() {
  const { isAuthenticated: o } = d(), { isBootstrapping: s } = m(), { routes: i, isLoading: p } = n();
  return s || o && p ? /* @__PURE__ */ e.jsx("div", { style: { padding: "2rem" }, children: "Loading..." }) : /* @__PURE__ */ e.jsxs(u, { children: [
    i.map((t) => /* @__PURE__ */ e.jsx(
      r,
      {
        path: t.path,
        element: /* @__PURE__ */ e.jsx(h, { requiresAuth: t.requiresAuth, requiredRoles: t.requiredRoles, children: t.element })
      },
      t.path
    )),
    /* @__PURE__ */ e.jsx(r, { path: "*", element: /* @__PURE__ */ e.jsx(a, { to: "/", replace: !0 }) })
  ] });
}
export {
  j as default
};
