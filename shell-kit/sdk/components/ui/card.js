import { j as d } from "../../jsx-runtime.js";
import * as s from "react";
import { c as o } from "../../utils.js";
const t = s.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d.jsx(
  "div",
  {
    ref: r,
    className: o(
      "rounded-xl border bg-card text-card-foreground shadow",
      a
    ),
    ...e
  }
));
t.displayName = "Card";
const i = s.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d.jsx(
  "div",
  {
    ref: r,
    className: o("flex flex-col space-y-1.5 p-6", a),
    ...e
  }
));
i.displayName = "CardHeader";
const c = s.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d.jsx(
  "div",
  {
    ref: r,
    className: o("font-semibold leading-none tracking-tight", a),
    ...e
  }
));
c.displayName = "CardTitle";
const m = s.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d.jsx(
  "div",
  {
    ref: r,
    className: o("text-sm text-muted-foreground", a),
    ...e
  }
));
m.displayName = "CardDescription";
const n = s.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d.jsx("div", { ref: r, className: o("p-6 pt-0", a), ...e }));
n.displayName = "CardContent";
const f = s.forwardRef(({ className: a, ...e }, r) => /* @__PURE__ */ d.jsx(
  "div",
  {
    ref: r,
    className: o("flex items-center p-6 pt-0", a),
    ...e
  }
));
f.displayName = "CardFooter";
export {
  t as Card,
  n as CardContent,
  m as CardDescription,
  f as CardFooter,
  i as CardHeader,
  c as CardTitle
};
