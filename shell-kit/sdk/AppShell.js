import { j as e } from "./jsx-runtime.js";
import { Toaster as l } from "./components/ui/sonner.js";
function n({ header: s, content: r }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "h-screen flex flex-col", children: [
    /* @__PURE__ */ e.jsx("header", { className: "shrink-0", children: s }),
    /* @__PURE__ */ e.jsx("main", { className: "flex-1 min-h-0", children: r }),
    /* @__PURE__ */ e.jsx(l, {})
  ] });
}
export {
  n as default
};
