import * as l from "react";
import R from "react";
import { c as v } from "./index6.js";
import { c as T, u as A } from "./index4.js";
import { j as E } from "./jsx-runtime.js";
// @__NO_SIDE_EFFECTS__
function M(e) {
  const t = /* @__PURE__ */ j(e), n = l.forwardRef((r, o) => {
    const { children: c, ...a } = r, s = l.Children.toArray(c), d = s.find(D);
    if (d) {
      const f = d.props.children, S = s.map((y) => y === d ? l.Children.count(f) > 1 ? l.Children.only(null) : l.isValidElement(f) ? f.props.children : null : y);
      return /* @__PURE__ */ E.jsx(t, { ...a, ref: o, children: l.isValidElement(f) ? l.cloneElement(f, void 0, S) : null });
    }
    return /* @__PURE__ */ E.jsx(t, { ...a, ref: o, children: c });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function j(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...c } = n;
    if (l.isValidElement(o)) {
      const a = w(o), s = b(c, o.props);
      return o.type !== l.Fragment && (s.ref = r ? T(r, a) : a), l.cloneElement(o, s);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var P = /* @__PURE__ */ Symbol("radix.slottable");
function D(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === P;
}
function b(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], c = t[r];
    /^on[A-Z]/.test(r) ? o && c ? n[r] = (...s) => {
      const d = c(...s);
      return o(...s), d;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...c } : r === "className" && (n[r] = [o, c].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function w(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function F(e) {
  const t = e + "CollectionProvider", [n, r] = v(t), [o, c] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (m) => {
    const { scope: i, children: x } = m, u = R.useRef(null), p = R.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ E.jsx(o, { scope: i, itemMap: p, collectionRef: u, children: x });
  };
  a.displayName = t;
  const s = e + "CollectionSlot", d = /* @__PURE__ */ M(s), f = R.forwardRef(
    (m, i) => {
      const { scope: x, children: u } = m, p = c(s, x), C = A(i, p.collectionRef);
      return /* @__PURE__ */ E.jsx(d, { ref: C, children: u });
    }
  );
  f.displayName = s;
  const S = e + "CollectionItemSlot", y = "data-radix-collection-item", N = /* @__PURE__ */ M(S), g = R.forwardRef(
    (m, i) => {
      const { scope: x, children: u, ...p } = m, C = R.useRef(null), _ = A(i, C), I = c(S, x);
      return R.useEffect(() => (I.itemMap.set(C, { ref: C, ...p }), () => {
        I.itemMap.delete(C);
      })), /* @__PURE__ */ E.jsx(N, { [y]: "", ref: _, children: u });
    }
  );
  g.displayName = S;
  function O(m) {
    const i = c(e + "CollectionConsumer", m);
    return R.useCallback(() => {
      const u = i.collectionRef.current;
      if (!u) return [];
      const p = Array.from(u.querySelectorAll(`[${y}]`));
      return Array.from(i.itemMap.values()).sort(
        (I, h) => p.indexOf(I.ref.current) - p.indexOf(h.ref.current)
      );
    }, [i.collectionRef, i.itemMap]);
  }
  return [
    { Provider: a, Slot: f, ItemSlot: g },
    O,
    r
  ];
}
var V = l.createContext(void 0);
function H(e) {
  const t = l.useContext(V);
  return e || t || "ltr";
}
export {
  F as c,
  H as u
};
