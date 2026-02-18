import { j as e } from "../../jsx-runtime.js";
import * as p from "react";
import { P as d } from "../../index8.js";
import { c as m } from "../../utils.js";
var v = "Separator", n = "horizontal", f = ["horizontal", "vertical"], s = p.forwardRef((r, t) => {
  const { decorative: o, orientation: a = n, ...l } = r, i = u(a) ? a : n, c = o ? { role: "none" } : { "aria-orientation": i === "vertical" ? i : void 0, role: "separator" };
  return /* @__PURE__ */ e.jsx(
    d.div,
    {
      "data-orientation": i,
      ...c,
      ...l,
      ref: t
    }
  );
});
s.displayName = v;
function u(r) {
  return f.includes(r);
}
var h = s;
function z({
  className: r,
  orientation: t = "horizontal",
  decorative: o = !0,
  ...a
}) {
  return /* @__PURE__ */ e.jsx(
    h,
    {
      "data-slot": "separator",
      decorative: o,
      orientation: t,
      className: m(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        r
      ),
      ...a
    }
  );
}
export {
  z as Separator
};
