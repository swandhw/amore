import { j as e } from "../../jsx-runtime.js";
import * as s from "@mescius/wijmo.react.input";
import { t as o } from "../../index.js";
const u = ({
  title: r = "제목이 누락되었습니다",
  actions: m,
  can: t = () => !0
}) => /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center gap-2 pb-4", children: [
  /* @__PURE__ */ e.jsx("h1", { className: "text-xl font-semibold text-primary", children: r }),
  /* @__PURE__ */ e.jsx(s.Menu, { header: "생성", isButton: !0, command: { executeCommand: m.createCommand }, isDisabled: !t("CREATE") }),
  /* @__PURE__ */ e.jsx(s.Menu, { header: "삭제", isButton: !0, command: { executeCommand: m.deleteCommand }, isDisabled: !t("DELETE") }),
  /* @__PURE__ */ e.jsx(s.Menu, { header: "조회", isButton: !0, command: { executeCommand: m.searchCommand }, isDisabled: !t("SEARCH") }),
  /* @__PURE__ */ e.jsx(s.Menu, { header: "저장", isButton: !0, command: {
    executeCommand: async () => {
      const a = await m.commitCommand();
      a.result || o.error(a.message);
    }
  }, isDisabled: !t("UPDATE") }),
  /* @__PURE__ */ e.jsx(s.Menu, { header: "Excel", isButton: !0, command: { executeCommand: m.excelCommand }, isDisabled: !t("EXCEL") })
] }) });
export {
  u as default
};
