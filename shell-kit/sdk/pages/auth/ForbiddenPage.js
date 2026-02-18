import { j as r } from "../../jsx-runtime.js";
import { Link as e } from "react-router-dom";
function n() {
  return /* @__PURE__ */ r.jsxs("div", { style: { padding: "2rem" }, children: [
    /* @__PURE__ */ r.jsx("h1", { children: "Forbidden" }),
    /* @__PURE__ */ r.jsx("p", { children: "해당 페이지에 접근할 권한이 없습니다." }),
    /* @__PURE__ */ r.jsx(e, { to: "/", children: "홈으로 돌아가기" })
  ] });
}
export {
  n as default
};
