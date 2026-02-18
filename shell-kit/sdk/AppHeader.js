import { j as e } from "./jsx-runtime.js";
import { useLocation as i, Link as s } from "react-router-dom";
const d = ({
  isAuthenticated: t,
  user: n,
  handleLogoutClick: r
}) => {
  const o = i();
  return /* @__PURE__ */ e.jsxs("div", { style: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    borderBottom: "1px solid #eee"
  }, children: [
    /* @__PURE__ */ e.jsx(s, { to: "/", children: /* @__PURE__ */ e.jsxs("h1", { className: "text-xl font-semibold text-foreground", children: [
      /* @__PURE__ */ e.jsx("span", { className: "text-primary", children: "AMORE PACIFIC" }),
      " 차세대 생산관리 시스템"
    ] }) }),
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: "0.75rem", alignItems: "center" }, children: [
      t ? /* @__PURE__ */ e.jsx("span", { children: n?.name ?? "사용자" }) : "",
      t ? /* @__PURE__ */ e.jsx("button", { type: "button", onClick: r, children: "로그아웃" }) : o.pathname?.startsWith("/login") ? "" : /* @__PURE__ */ e.jsx(s, { to: "/login", children: "로그인 페이지로 이동" })
    ] })
  ] });
};
export {
  d as default
};
