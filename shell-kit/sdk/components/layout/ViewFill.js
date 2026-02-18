import { j as i } from "../../jsx-runtime.js";
import { c as r } from "../../utils.js";
const s = {
  root: "flex h-full min-h-0 flex-col",
  body: "flex-1 min-h-0 overflow-hidden",
  scroll: "flex-1 min-h-0 overflow-auto"
}, t = ({
  variant: o = "body",
  className: l,
  ...e
}) => /* @__PURE__ */ i.jsx("div", { className: r(s[o], l), ...e });
export {
  t as ViewFill
};
