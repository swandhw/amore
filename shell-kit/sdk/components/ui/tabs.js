import { j as a } from "../../jsx-runtime.js";
import * as i from "react";
import { c } from "../../utils.js";
const l = i.createContext(null), g = ({
  className: s,
  defaultValue: t = "",
  value: n,
  onValueChange: e,
  ...o
}) => {
  const [r, m] = i.useState(t), u = n !== void 0, x = u ? n : r, b = i.useCallback(
    (d) => {
      u || m(d), e?.(d);
    },
    [u, e]
  );
  return /* @__PURE__ */ a.jsx(l.Provider, { value: { value: x, setValue: b }, children: /* @__PURE__ */ a.jsx("div", { className: c("space-y-4", "flex", "h-full", "min-h-0", "flex-col", "space-y-0", s), ...o }) });
}, h = ({
  className: s,
  ...t
}) => /* @__PURE__ */ a.jsx(
  "div",
  {
    className: c(
      "inline-flex items-center gap-2 rounded-lg bg-muted/50 p-1",
      s
    ),
    ...t
  }
), T = ({
  className: s,
  value: t,
  ...n
}) => {
  const e = i.useContext(l);
  if (!e)
    throw new Error("TabsTrigger must be used within Tabs.");
  const o = e.value === t;
  return /* @__PURE__ */ a.jsx(
    "button",
    {
      type: "button",
      onClick: () => e.setValue(t),
      className: c(
        "rounded-md px-3 py-1.5 text-sm font-medium transition",
        o ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
        s
      ),
      ...n
    }
  );
}, v = ({
  className: s,
  value: t,
  keepMounted: n = !1,
  ...e
}) => {
  const o = i.useContext(l);
  if (!o)
    throw new Error("TabsContent must be used within Tabs.");
  const r = o.value === t;
  return !r && !n ? null : /* @__PURE__ */ a.jsx(
    "div",
    {
      className: c("space-y-4", "flex-1", "min-h-0", "space-y-0", !r && "hidden", s),
      hidden: !r,
      ...e
    }
  );
};
export {
  g as Tabs,
  v as TabsContent,
  h as TabsList,
  T as TabsTrigger
};
