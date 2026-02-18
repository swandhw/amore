import * as n from "react";
import "react-dom";
import { c as f } from "./index2.js";
import { j as l } from "./jsx-runtime.js";
var u = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], w = u.reduce((t, i) => {
  const o = f(`Primitive.${i}`), r = n.forwardRef((e, a) => {
    const { asChild: m, ...s } = e, p = m ? o : i;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l.jsx(p, { ...s, ref: a });
  });
  return r.displayName = `Primitive.${i}`, { ...t, [i]: r };
}, {});
export {
  w as P
};
