import { j as o } from "../../../jsx-runtime.js";
import t from "react";
import { CloseGuardTabProvider as d } from "../../close-guard/CloseGuardContext.js";
import { c as i } from "../../../utils.js";
function u({ tab: e, isActive: n, keepMounted: l }) {
  const r = t.isValidElement(e.route.element) ? t.cloneElement(e.route.element, { key: e.id }) : null;
  return !n && !l ? null : /* @__PURE__ */ o.jsx(d, { tabId: e.id, children: /* @__PURE__ */ o.jsx(
    "div",
    {
      className: i("flex", "flex-1", "min-h-0", "flex-col", "h-full", "overflow-hidden", !n && "hidden", "ap-content-container"),
      hidden: !n,
      children: r
    }
  ) });
}
export {
  u as default
};
