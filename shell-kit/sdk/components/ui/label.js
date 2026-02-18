import { j as r } from "../../jsx-runtime.js";
import * as s from "react";
import { P as i } from "../../index8.js";
import { c as l } from "../../utils.js";
var n = "Label", o = s.forwardRef((t, a) => /* @__PURE__ */ r.jsx(
  i.label,
  {
    ...t,
    ref: a,
    onMouseDown: (e) => {
      e.target.closest("button, input, select, textarea") || (t.onMouseDown?.(e), !e.defaultPrevented && e.detail > 1 && e.preventDefault());
    }
  }
));
o.displayName = n;
var d = o;
function c({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ r.jsx(
    d,
    {
      "data-slot": "label",
      className: l(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        t
      ),
      ...a
    }
  );
}
export {
  c as Label
};
