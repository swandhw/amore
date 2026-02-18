import * as e from "react";
import { c as S } from "./index4.js";
import { j as y } from "./jsx-runtime.js";
var E = /* @__PURE__ */ Symbol.for("react.lazy"), p = e[" use ".trim().toString()];
function g(t) {
  return typeof t == "object" && t !== null && "then" in t;
}
function d(t) {
  return t != null && typeof t == "object" && "$$typeof" in t && t.$$typeof === E && "_payload" in t && g(t._payload);
}
// @__NO_SIDE_EFFECTS__
function C(t) {
  const n = /* @__PURE__ */ R(t), o = e.forwardRef((i, r) => {
    let { children: l, ...a } = i;
    d(l) && typeof p == "function" && (l = p(l._payload));
    const s = e.Children.toArray(l), f = s.find(b);
    if (f) {
      const c = f.props.children, m = s.map((u) => u === f ? e.Children.count(c) > 1 ? e.Children.only(null) : e.isValidElement(c) ? c.props.children : null : u);
      return /* @__PURE__ */ y.jsx(n, { ...a, ref: r, children: e.isValidElement(c) ? e.cloneElement(c, void 0, m) : null });
    }
    return /* @__PURE__ */ y.jsx(n, { ...a, ref: r, children: l });
  });
  return o.displayName = `${t}.Slot`, o;
}
var A = /* @__PURE__ */ C("Slot");
// @__NO_SIDE_EFFECTS__
function R(t) {
  const n = e.forwardRef((o, i) => {
    let { children: r, ...l } = o;
    if (d(r) && typeof p == "function" && (r = p(r._payload)), e.isValidElement(r)) {
      const a = j(r), s = h(l, r.props);
      return r.type !== e.Fragment && (s.ref = i ? S(i, a) : a), e.cloneElement(r, s);
    }
    return e.Children.count(r) > 1 ? e.Children.only(null) : null;
  });
  return n.displayName = `${t}.SlotClone`, n;
}
var _ = /* @__PURE__ */ Symbol("radix.slottable");
function b(t) {
  return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === _;
}
function h(t, n) {
  const o = { ...n };
  for (const i in n) {
    const r = t[i], l = n[i];
    /^on[A-Z]/.test(i) ? r && l ? o[i] = (...s) => {
      const f = l(...s);
      return r(...s), f;
    } : r && (o[i] = r) : i === "style" ? o[i] = { ...r, ...l } : i === "className" && (o[i] = [r, l].filter(Boolean).join(" "));
  }
  return { ...t, ...o };
}
function j(t) {
  let n = Object.getOwnPropertyDescriptor(t.props, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning;
  return o ? t.ref : (n = Object.getOwnPropertyDescriptor(t, "ref")?.get, o = n && "isReactWarning" in n && n.isReactWarning, o ? t.props.ref : t.props.ref || t.ref);
}
export {
  A as S,
  C as c
};
