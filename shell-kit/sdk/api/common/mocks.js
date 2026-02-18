import { http as o, HttpResponse as t } from "msw";
import { AUTH_USERS as m } from "../auth/mocks.js";
const l = [
  { id: "basic-infos", name: "기본정보" },
  { id: "production-infos", name: "생산정보" },
  { id: "packaging-infos", name: "패키징정보" },
  { id: "dev-infos", name: "개발정보" },
  { id: "ai-transform", name: "AI 변환" }
], c = [
  {
    id: "DESIGN_GUIDES",
    name: "Design Guide",
    path: "/design-guide-pages",
    requiredRoles: ["ROLE_ADMIN"],
    domainId: "dev-infos",
    lv1Name: "개발정보"
  },
  {
    id: "STORYBOARD",
    name: "storyboard",
    path: "/storyboard-pages",
    requiredRoles: ["ROLE_ADMIN"],
    domainId: "dev-infos",
    lv1Name: "개발정보"
  },
  {
    id: "SHIPMENTS",
    name: "Shipments",
    path: "/shipments",
    requiredRoles: ["ROLE_MANAGER"],
    domainId: "production-infos",
    lv1Name: "패키징정보"
  },
  {
    id: "CATALOGS",
    name: "Catalogs",
    path: "/catalogs",
    requiredRoles: ["ROLE_MANAGER"],
    domainId: "basic-infos",
    lv1Name: "개발정보"
  },
  {
    id: "BASIC_INFO_OVERVIEW",
    name: "기본정보 개요",
    path: "/basic-infos/overview",
    requiredRoles: [],
    domainId: "basic-infos",
    lv1Name: "기본정보"
  },
  {
    id: "BAD_CODE_REGISTER",
    name: "불량코드 등록",
    path: "/basic-infos/badCodeRegister",
    requiredRoles: [],
    domainId: "basic-infos",
    lv1Name: "기본정보"
  },
  {
    id: "NEW_PRODUCT_REGISTER",
    name: "신제품 등록",
    path: "/basic-infos/new-product-register",
    requiredRoles: [],
    domainId: "basic-infos",
    lv1Name: "기본정보"
  },
  {
    id: "D_PMASM_PROCESS",
    name: "표준공정 등록",
    path: "/basic-infos/dpmasm-process",
    requiredRoles: [],
    domainId: "basic-infos",
    lv1Name: "기본정보"
  },
  {
    id: "AI_TRANSFORM_BAD_CODE_REGISTER",
    name: "불량코드 등록 (AI 변환)",
    path: "/ai-transform/bad-code-register",
    requiredRoles: [],
    domainId: "ai-transform",
    lv1Name: "AI 변환"
  },
  {
    id: "PRODUCTION_INFO_OVERVIEW",
    name: "생산정보 개요",
    path: "/production-infos/overview",
    requiredRoles: [],
    domainId: "production-infos",
    lv1Name: "생산정보"
  },
  {
    id: "PACKAGING_INFO_OVERVIEW",
    name: "패키징정보 개요",
    path: "/packaging-infos/overview",
    requiredRoles: [],
    domainId: "packaging-infos",
    lv1Name: "패키징정보"
  }
], u = (n) => c.filter((i) => i.requiredRoles.length === 0 ? !0 : i.requiredRoles.some((e) => n.includes(e))), f = (n) => {
  const i = u(n);
  return l.map((e) => ({
    id: e.id,
    name: e.name,
    pages: i.filter((s) => s.domainId === e.id)
  })).filter((e) => e.pages.length > 0);
}, R = [
  // --- Pages Handlers ---
  o.get("/api/bff/pages", async ({ request: n }) => {
    const i = n.headers.get("Authorization");
    let e = [];
    if (i) {
      const s = i.replace("Bearer ", "");
      let a = "";
      s.includes("admin-user") ? a = "admin-user" : s.includes("manager-user") ? a = "manager-user" : s.includes("standard-user") && (a = "standard-user");
      const r = m.find((d) => d.id === a);
      r && (e = r.roles);
    }
    return t.json({
      pages: u(e)
    });
  }),
  o.get("/api/bff/pages/domain-menus", async ({ request: n }) => {
    const i = n.headers.get("Authorization");
    let e = [];
    if (i) {
      const s = i.replace("Bearer ", "");
      let a = "";
      s.includes("admin-user") ? a = "admin-user" : s.includes("manager-user") ? a = "manager-user" : s.includes("standard-user") && (a = "standard-user");
      const r = m.find((d) => d.id === a);
      r && (e = r.roles);
    }
    return t.json({
      domains: f(e)
    });
  })
];
export {
  l as DOMAIN_DEFINITIONS,
  c as PAGE_DEFINITIONS,
  R as commonHandlers
};
