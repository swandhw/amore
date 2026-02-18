import P, { useMemo as I } from "react";
import p from "./pages/auth/ForbiddenPage.js";
import A from "./pages/auth/LoginPage.js";
import { j as m } from "./jsx-runtime.js";
import { useAuthStore as _ } from "./stores/auth-store.js";
import { BASIC_INFO_PAGES as E } from "./routes/RoutesBasicInfos.js";
import R from "./pages/production-infos/ProductionInfoOverviewPage.js";
import v from "./pages/packaging-infos/PackagingInfoOverview/PackagingInfoOverviewPage.js";
import { LOCAL_DEV_DOMAIN_ID as l, DEV_LOCAL_APP_ROUTES as h , DEV_LOCAL_SERVER_PAGES as dp } from "./routes/DevRoutes.js";
import N from "./components/home/HomeView.js";
import { useDomainMenuList as C } from "./components/home/hooks/useDomainMenuList.js";
import { CloseGuardProvider as D } from "./components/close-guard/CloseGuardContext.js";
const b = { path: "/", sourcePath: "@/components/home/HomePage", requireAuth: !1 }, w = { path: "/login", sourcePath: "@/pages/auth/LoginPage", requireAuth: !1 }, S = { path: "/forbidden", sourcePath: "@/pages/auth/ForbiddenPage", requireAuth: !1 }, q = { path: "/production-infos/overview", sourcePath: "@/pages/production-infos/ProductionInfoOverviewPage", requireAuth: !0 }, L = { path: "/packaging-infos/overview", sourcePath: "@/pages/packaging-infos/PackagingInfoOverview/PackagingInfoOverviewPage", requireAuth: !0 }, T = {
  HOME: b,
  LOGIN: w,
  FORBIDDEN: S,
  PRODUCTION_INFO_OVERVIEW: q,
  PACKAGING_INFO_OVERVIEW: L
}, F = { path: "/basic-infos/overview", sourcePath: "@/pages/basic-infos/basicInfoOverview/BasicInfoOverviewPage", requireAuth: !0 }, M = { path: "/basic-infos/badCodeRegister", sourcePath: "@/pages/basic-infos/badCodeRegister/BadCodeRegisterPage", requireAuth: !0 }, V = { path: "/basic-infos/new-product-register", sourcePath: "@/pages/basic-infos/newProductRegister/NewProductRegisterPage", requireAuth: !0 }, G = { path: "/basic-infos/dpmasm-process", sourcePath: "@/pages/basic-infos/dpmasmProcess/DpmasmProcessPage", requireAuth: !0 }, B = { path: "/basic-infos/form-template", sourcePath: "@/pages/basic-infos/form-template/FormTemplatePage", requireAuth: !0 }, W = {
  BASIC_INFO_OVERVIEW: F,
  BAD_CODE_REGISTER: M,
  NEW_PRODUCT_REGISTER: V,
  D_PMASM_PROCESS: G,
  BASIC_INFO_FORM_TEMPLATE: B
};
function k() {
  const { user: t, roles: e } = _(), { data: s, isLoading: a } = C(), n = I(() => (import.meta.env.DEV ? (s?.domains ?? []).concat([{ id: l, name: 'LOCAL DEV', pages: dp }]) : (s?.domains ?? [])).map((r) => {
    const d = r.id === l ? h : g(r.pages), f = new Map(d.map((o) => [o.path, o])), O = r.pages.flatMap((o) => {
      const c = f.get(o.path);
      return c ? [
        {
          id: o.path,
          label: o.name,
          route: c,
          keepMounted: !0
        }
      ] : [];
    });
    return {
      id: r.id,
      name: r.name,
      menus: O
    };
  }), [s?.domains]);
  return /* @__PURE__ */ m.jsx(D, { children: /* @__PURE__ */ m.jsx(N, { user: t, roles: e, domains: n, isLoading: a }) });
}
const x = { ...T, ...W }, i = {
  _description: p,
  HOME: k,
  LOGIN: A,
  FORBIDDEN: p,
  PRODUCTION_INFO_OVERVIEW: R,
  PACKAGING_INFO_OVERVIEW: v,
  ...E
}, H = x, U = Object.entries(H).map(
  ([t, e]) => ({
    path: e.path,
    element: P.createElement(i[t]),
    requiresAuth: e.requireAuth,
    requiredRoles: e.requiredRoles
  })
), re = [...U, ...h].filter(
  (t, e, s) => s.findIndex((a) => a.path === t.path) === e
), g = (t) => t.filter((e) => i[e.id] !== void 0).map((e) => ({
  path: e.path,
  element: P.createElement(i[e.id]),
  requiresAuth: !0,
  requiredRoles: e.requiredRoles
})), oe = (t, e) => {
  const a = g(e).filter((u) => t.find((r) => r.path === u.path) === void 0);
  return [...t, ...a];
};
export {
  k as H,
  re as L,
  H as P,
  g as a,
  oe as m
};
