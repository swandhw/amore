import { j as e } from "../../jsx-runtime.js";
import * as w from "react";
import { c as p } from "../../utils.js";
const y = (t, i, d) => Math.max(i, Math.min(t, d)), P = ({
  direction: t = "horizontal",
  size: i,
  defaultSize: d = 320,
  minSize: o = 200,
  maxSize: v,
  onSizeChange: x,
  className: g,
  primary: b,
  secondary: j
}) => {
  const h = w.useRef(null), [z, N] = w.useState(d), f = i !== void 0, m = f ? i : z, R = w.useCallback(
    (u) => {
      const r = h.current;
      if (!r)
        return;
      const l = r.getBoundingClientRect(), a = v ?? (t === "horizontal" ? l.width - o : l.height - o), c = Math.max(o, a), s = y(u, o, c);
      f || N(s), x?.(s);
    },
    [t, f, v, o, x]
  ), M = (u) => {
    u.preventDefault();
    const r = (a) => {
      const c = h.current;
      if (!c)
        return;
      const s = c.getBoundingClientRect(), k = t === "horizontal" ? a.clientX - s.left : a.clientY - s.top;
      R(k);
    }, l = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", l);
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", l);
  }, n = t === "horizontal";
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      ref: h,
      className: p(
        "flex h-full w-full overflow-hidden rounded-lg border border-slate-200 bg-white",
        n ? "flex-row" : "flex-col",
        g
      ),
      children: [
        /* @__PURE__ */ e.jsx(
          "div",
          {
            className: "flex-shrink-0",
            style: n ? { width: m } : { height: m },
            children: /* @__PURE__ */ e.jsx("div", { className: "h-full w-full overflow-y-hidden overflow-x-scroll p-4", children: b })
          }
        ),
        /* @__PURE__ */ e.jsx(
          "div",
          {
            role: "separator",
            "aria-orientation": n ? "vertical" : "horizontal",
            onPointerDown: M,
            className: p(
              "relative flex items-center justify-center bg-backgroud bg-slate-100",
              n ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize"
            ),
            children: /* @__PURE__ */ e.jsx(
              "span",
              {
                className: p(
                  "rounded-full bg-background ",
                  n ? "h-8 w-1" : "h-1 w-8"
                )
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ e.jsx("div", { className: "h-full w-full overflow-y-hidden overflow-x-scroll p-4", children: j }) })
      ]
    }
  );
};
export {
  P as ResizableSplitView
};
