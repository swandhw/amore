import * as a from "react";
import { useState as Ne } from "react";
import { e as U, u as Te } from "./index6.js";
import * as Ae from "react-dom";
import Le from "react-dom";
import { c as ee, u as te } from "./index4.js";
import { j as P } from "./jsx-runtime.js";
import { u as k } from "./index7.js";
// @__NO_SIDE_EFFECTS__
function De(e) {
  const t = /* @__PURE__ */ xe(e), n = a.forwardRef((r, o) => {
    const { children: s, ...c } = r, i = a.Children.toArray(s), f = i.find(Ie);
    if (f) {
      const l = f.props.children, v = i.map((d) => d === f ? a.Children.count(l) > 1 ? a.Children.only(null) : a.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ P.jsx(t, { ...c, ref: o, children: a.isValidElement(l) ? a.cloneElement(l, void 0, v) : null });
    }
    return /* @__PURE__ */ P.jsx(t, { ...c, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function xe(e) {
  const t = a.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (a.isValidElement(o)) {
      const c = Me(o), i = ke(s, o.props);
      return o.type !== a.Fragment && (i.ref = r ? ee(r, c) : c), a.cloneElement(o, i);
    }
    return a.Children.count(o) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Fe = /* @__PURE__ */ Symbol("radix.slottable");
function Ie(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Fe;
}
function ke(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...i) => {
      const f = s(...i);
      return o(...i), f;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Me(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var We = [
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
], me = We.reduce((e, t) => {
  const n = /* @__PURE__ */ De(`Primitive.${t}`), r = a.forwardRef((o, s) => {
    const { asChild: c, ...i } = o, f = c ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ P.jsx(f, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Be(e, t) {
  e && Ae.flushSync(() => e.dispatchEvent(t));
}
function _e(e, t = globalThis?.document) {
  const n = k(e);
  a.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var je = "DismissableLayer", Q = "dismissableLayer.update", $e = "dismissableLayer.pointerDownOutside", Ve = "dismissableLayer.focusOutside", re, he = a.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), He = a.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: c,
      onDismiss: i,
      ...f
    } = e, l = a.useContext(he), [v, d] = a.useState(null), m = v?.ownerDocument ?? globalThis?.document, [, E] = a.useState({}), C = te(t, (y) => d(y)), u = Array.from(l.layers), [p] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), h = u.indexOf(p), g = v ? u.indexOf(v) : -1, b = l.layersWithOutsidePointerEventsDisabled.size > 0, S = g >= h, w = Xe((y) => {
      const T = y.target, A = [...l.branches].some((I) => I.contains(T));
      !S || A || (o?.(y), c?.(y), y.defaultPrevented || i?.());
    }, m), R = Ye((y) => {
      const T = y.target;
      [...l.branches].some((I) => I.contains(T)) || (s?.(y), c?.(y), y.defaultPrevented || i?.());
    }, m);
    return _e((y) => {
      g === l.layers.size - 1 && (r?.(y), !y.defaultPrevented && i && (y.preventDefault(), i()));
    }, m), a.useEffect(() => {
      if (v)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (re = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(v)), l.layers.add(v), oe(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = re);
        };
    }, [v, m, n, l]), a.useEffect(() => () => {
      v && (l.layers.delete(v), l.layersWithOutsidePointerEventsDisabled.delete(v), oe());
    }, [v, l]), a.useEffect(() => {
      const y = () => E({});
      return document.addEventListener(Q, y), () => document.removeEventListener(Q, y);
    }, []), /* @__PURE__ */ P.jsx(
      me.div,
      {
        ...f,
        ref: C,
        style: {
          pointerEvents: b ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: U(e.onFocusCapture, R.onFocusCapture),
        onBlurCapture: U(e.onBlurCapture, R.onBlurCapture),
        onPointerDownCapture: U(
          e.onPointerDownCapture,
          w.onPointerDownCapture
        )
      }
    );
  }
);
He.displayName = je;
var Ue = "DismissableLayerBranch", Ke = a.forwardRef((e, t) => {
  const n = a.useContext(he), r = a.useRef(null), o = te(t, r);
  return a.useEffect(() => {
    const s = r.current;
    if (s)
      return n.branches.add(s), () => {
        n.branches.delete(s);
      };
  }, [n.branches]), /* @__PURE__ */ P.jsx(me.div, { ...e, ref: o });
});
Ke.displayName = Ue;
function Xe(e, t = globalThis?.document) {
  const n = k(e), r = a.useRef(!1), o = a.useRef(() => {
  });
  return a.useEffect(() => {
    const s = (i) => {
      if (i.target && !r.current) {
        let f = function() {
          ye(
            $e,
            n,
            l,
            { discrete: !0 }
          );
        };
        const l = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = f, t.addEventListener("click", o.current, { once: !0 })) : f();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, c = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(c), t.removeEventListener("pointerdown", s), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function Ye(e, t = globalThis?.document) {
  const n = k(e), r = a.useRef(!1);
  return a.useEffect(() => {
    const o = (s) => {
      s.target && !r.current && ye(Ve, n, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function oe() {
  const e = new CustomEvent(Q);
  document.dispatchEvent(e);
}
function ye(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Be(o, s) : o.dispatchEvent(s);
}
var K = 0;
function vn() {
  a.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ae()), document.body.insertAdjacentElement("beforeend", e[1] ?? ae()), K++, () => {
      K === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), K--;
    };
  }, []);
}
function ae() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
// @__NO_SIDE_EFFECTS__
function ze(e) {
  const t = /* @__PURE__ */ Ze(e), n = a.forwardRef((r, o) => {
    const { children: s, ...c } = r, i = a.Children.toArray(s), f = i.find(qe);
    if (f) {
      const l = f.props.children, v = i.map((d) => d === f ? a.Children.count(l) > 1 ? a.Children.only(null) : a.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ P.jsx(t, { ...c, ref: o, children: a.isValidElement(l) ? a.cloneElement(l, void 0, v) : null });
    }
    return /* @__PURE__ */ P.jsx(t, { ...c, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  const t = a.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (a.isValidElement(o)) {
      const c = Je(o), i = Qe(s, o.props);
      return o.type !== a.Fragment && (i.ref = r ? ee(r, c) : c), a.cloneElement(o, i);
    }
    return a.Children.count(o) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ge = /* @__PURE__ */ Symbol("radix.slottable");
function qe(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ge;
}
function Qe(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...i) => {
      const f = s(...i);
      return o(...i), f;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Je(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var et = [
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
], tt = et.reduce((e, t) => {
  const n = /* @__PURE__ */ ze(`Primitive.${t}`), r = a.forwardRef((o, s) => {
    const { asChild: c, ...i } = o, f = c ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ P.jsx(f, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), X = "focusScope.autoFocusOnMount", Y = "focusScope.autoFocusOnUnmount", ie = { bubbles: !1, cancelable: !0 }, nt = "FocusScope", rt = a.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...c
  } = e, [i, f] = a.useState(null), l = k(o), v = k(s), d = a.useRef(null), m = te(t, (u) => f(u)), E = a.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  a.useEffect(() => {
    if (r) {
      let u = function(b) {
        if (E.paused || !i) return;
        const S = b.target;
        i.contains(S) ? d.current = S : N(d.current, { select: !0 });
      }, p = function(b) {
        if (E.paused || !i) return;
        const S = b.relatedTarget;
        S !== null && (i.contains(S) || N(d.current, { select: !0 }));
      }, h = function(b) {
        if (document.activeElement === document.body)
          for (const w of b)
            w.removedNodes.length > 0 && N(i);
      };
      document.addEventListener("focusin", u), document.addEventListener("focusout", p);
      const g = new MutationObserver(h);
      return i && g.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", u), document.removeEventListener("focusout", p), g.disconnect();
      };
    }
  }, [r, i, E.paused]), a.useEffect(() => {
    if (i) {
      ce.add(E);
      const u = document.activeElement;
      if (!i.contains(u)) {
        const h = new CustomEvent(X, ie);
        i.addEventListener(X, l), i.dispatchEvent(h), h.defaultPrevented || (ot(ut(Ee(i)), { select: !0 }), document.activeElement === u && N(i));
      }
      return () => {
        i.removeEventListener(X, l), setTimeout(() => {
          const h = new CustomEvent(Y, ie);
          i.addEventListener(Y, v), i.dispatchEvent(h), h.defaultPrevented || N(u ?? document.body, { select: !0 }), i.removeEventListener(Y, v), ce.remove(E);
        }, 0);
      };
    }
  }, [i, l, v, E]);
  const C = a.useCallback(
    (u) => {
      if (!n && !r || E.paused) return;
      const p = u.key === "Tab" && !u.altKey && !u.ctrlKey && !u.metaKey, h = document.activeElement;
      if (p && h) {
        const g = u.currentTarget, [b, S] = at(g);
        b && S ? !u.shiftKey && h === S ? (u.preventDefault(), n && N(b, { select: !0 })) : u.shiftKey && h === b && (u.preventDefault(), n && N(S, { select: !0 })) : h === g && u.preventDefault();
      }
    },
    [n, r, E.paused]
  );
  return /* @__PURE__ */ P.jsx(tt.div, { tabIndex: -1, ...c, ref: m, onKeyDown: C });
});
rt.displayName = nt;
function ot(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (N(r, { select: t }), document.activeElement !== n) return;
}
function at(e) {
  const t = Ee(e), n = se(t, e), r = se(t.reverse(), e);
  return [n, r];
}
function Ee(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function se(e, t) {
  for (const n of e)
    if (!it(n, { upTo: t })) return n;
}
function it(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function st(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function N(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && st(e) && t && e.select();
  }
}
var ce = ct();
function ct() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = ue(e, t), e.unshift(t);
    },
    remove(t) {
      e = ue(e, t), e[0]?.resume();
    }
  };
}
function ue(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function ut(e) {
  return e.filter((t) => t.tagName !== "A");
}
// @__NO_SIDE_EFFECTS__
function lt(e) {
  const t = /* @__PURE__ */ ft(e), n = a.forwardRef((r, o) => {
    const { children: s, ...c } = r, i = a.Children.toArray(s), f = i.find(vt);
    if (f) {
      const l = f.props.children, v = i.map((d) => d === f ? a.Children.count(l) > 1 ? a.Children.only(null) : a.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ P.jsx(t, { ...c, ref: o, children: a.isValidElement(l) ? a.cloneElement(l, void 0, v) : null });
    }
    return /* @__PURE__ */ P.jsx(t, { ...c, ref: o, children: s });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  const t = a.forwardRef((n, r) => {
    const { children: o, ...s } = n;
    if (a.isValidElement(o)) {
      const c = mt(o), i = pt(s, o.props);
      return o.type !== a.Fragment && (i.ref = r ? ee(r, c) : c), a.cloneElement(o, i);
    }
    return a.Children.count(o) > 1 ? a.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var dt = /* @__PURE__ */ Symbol("radix.slottable");
function vt(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === dt;
}
function pt(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...i) => {
      const f = s(...i);
      return o(...i), f;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function mt(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ht = [
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
], yt = ht.reduce((e, t) => {
  const n = /* @__PURE__ */ lt(`Primitive.${t}`), r = a.forwardRef((o, s) => {
    const { asChild: c, ...i } = o, f = c ? n : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ P.jsx(f, { ...i, ref: s });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), Et = "Portal", gt = a.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, s] = a.useState(!1);
  Te(() => s(!0), []);
  const c = n || o && globalThis?.document?.body;
  return c ? Le.createPortal(/* @__PURE__ */ P.jsx(yt.div, { ...r, ref: t }), c) : null;
});
gt.displayName = Et;
var bt = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, L = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), B = {}, z = 0, ge = function(e) {
  return e && (e.host || ge(e.parentNode));
}, St = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = ge(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, wt = function(e, t, n, r) {
  var o = St(t, Array.isArray(e) ? e : [e]);
  B[n] || (B[n] = /* @__PURE__ */ new WeakMap());
  var s = B[n], c = [], i = /* @__PURE__ */ new Set(), f = new Set(o), l = function(d) {
    !d || i.has(d) || (i.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var v = function(d) {
    !d || f.has(d) || Array.prototype.forEach.call(d.children, function(m) {
      if (i.has(m))
        v(m);
      else
        try {
          var E = m.getAttribute(r), C = E !== null && E !== "false", u = (L.get(m) || 0) + 1, p = (s.get(m) || 0) + 1;
          L.set(m, u), s.set(m, p), c.push(m), u === 1 && C && W.set(m, !0), p === 1 && m.setAttribute(n, "true"), C || m.setAttribute(r, "true");
        } catch (h) {
          console.error("aria-hidden: cannot operate on ", m, h);
        }
    });
  };
  return v(t), i.clear(), z++, function() {
    c.forEach(function(d) {
      var m = L.get(d) - 1, E = s.get(d) - 1;
      L.set(d, m), s.set(d, E), m || (W.has(d) || d.removeAttribute(r), W.delete(d)), E || d.removeAttribute(n);
    }), z--, z || (L = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), B = {});
  };
}, pn = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = bt(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), wt(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, O = function() {
  return O = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
    return t;
  }, O.apply(this, arguments);
};
function be(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Ct(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, s; r < o; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var $ = "right-scroll-bar-position", V = "width-before-scroll-bar", Pt = "with-scroll-bars-hidden", Rt = "--removed-body-scroll-bar-size";
function Z(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Ot(e, t) {
  var n = Ne(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var Nt = typeof window < "u" ? a.useLayoutEffect : a.useEffect, le = /* @__PURE__ */ new WeakMap();
function Tt(e, t) {
  var n = Ot(null, function(r) {
    return e.forEach(function(o) {
      return Z(o, r);
    });
  });
  return Nt(function() {
    var r = le.get(n);
    if (r) {
      var o = new Set(r), s = new Set(e), c = n.current;
      o.forEach(function(i) {
        s.has(i) || Z(i, null);
      }), s.forEach(function(i) {
        o.has(i) || Z(i, c);
      });
    }
    le.set(n, e);
  }, [e]), n;
}
function At(e) {
  return e;
}
function Lt(e, t) {
  t === void 0 && (t = At);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(s) {
      var c = t(s, r);
      return n.push(c), function() {
        n = n.filter(function(i) {
          return i !== c;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (r = !0; n.length; ) {
        var c = n;
        n = [], c.forEach(s);
      }
      n = {
        push: function(i) {
          return s(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(s) {
      r = !0;
      var c = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(s), c = n;
      }
      var f = function() {
        var v = c;
        c = [], v.forEach(s);
      }, l = function() {
        return Promise.resolve().then(f);
      };
      l(), n = {
        push: function(v) {
          c.push(v), l();
        },
        filter: function(v) {
          return c = c.filter(v), n;
        }
      };
    }
  };
  return o;
}
function Dt(e) {
  e === void 0 && (e = {});
  var t = Lt(null);
  return t.options = O({ async: !0, ssr: !1 }, e), t;
}
var Se = function(e) {
  var t = e.sideCar, n = be(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return a.createElement(r, O({}, n));
};
Se.isSideCarExport = !0;
function xt(e, t) {
  return e.useMedium(t), Se;
}
var we = Dt(), G = function() {
}, H = a.forwardRef(function(e, t) {
  var n = a.useRef(null), r = a.useState({
    onScrollCapture: G,
    onWheelCapture: G,
    onTouchMoveCapture: G
  }), o = r[0], s = r[1], c = e.forwardProps, i = e.children, f = e.className, l = e.removeScrollBar, v = e.enabled, d = e.shards, m = e.sideCar, E = e.noRelative, C = e.noIsolation, u = e.inert, p = e.allowPinchZoom, h = e.as, g = h === void 0 ? "div" : h, b = e.gapMode, S = be(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), w = m, R = Tt([n, t]), y = O(O({}, S), o);
  return a.createElement(
    a.Fragment,
    null,
    v && a.createElement(w, { sideCar: we, removeScrollBar: l, shards: d, noRelative: E, noIsolation: C, inert: u, setCallbacks: s, allowPinchZoom: !!p, lockRef: n, gapMode: b }),
    c ? a.cloneElement(a.Children.only(i), O(O({}, y), { ref: R })) : a.createElement(g, O({}, y, { className: f, ref: R }), i)
  );
});
H.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
H.classNames = {
  fullWidth: V,
  zeroRight: $
};
var Ft = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function It() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Ft();
  return t && e.setAttribute("nonce", t), e;
}
function kt(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Mt(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Wt = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = It()) && (kt(t, n), Mt(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Bt = function() {
  var e = Wt();
  return function(t, n) {
    a.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Ce = function() {
  var e = Bt(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, _t = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, q = function(e) {
  return parseInt(e || "", 10) || 0;
}, jt = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [q(n), q(r), q(o)];
}, $t = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return _t;
  var t = jt(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Vt = Ce(), F = "data-scroll-locked", Ht = function(e, t, n, r) {
  var o = e.left, s = e.top, c = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Pt, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(F, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(c, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat($, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(V, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat($, " .").concat($, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(V, " .").concat(V, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(F, `] {
    `).concat(Rt, ": ").concat(i, `px;
  }
`);
}, fe = function() {
  var e = parseInt(document.body.getAttribute(F) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ut = function() {
  a.useEffect(function() {
    return document.body.setAttribute(F, (fe() + 1).toString()), function() {
      var e = fe() - 1;
      e <= 0 ? document.body.removeAttribute(F) : document.body.setAttribute(F, e.toString());
    };
  }, []);
}, Kt = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Ut();
  var s = a.useMemo(function() {
    return $t(o);
  }, [o]);
  return a.createElement(Vt, { styles: Ht(s, !t, o, n ? "" : "!important") });
}, J = !1;
if (typeof window < "u")
  try {
    var _ = Object.defineProperty({}, "passive", {
      get: function() {
        return J = !0, !0;
      }
    });
    window.addEventListener("test", _, _), window.removeEventListener("test", _, _);
  } catch {
    J = !1;
  }
var D = J ? { passive: !1 } : !1, Xt = function(e) {
  return e.tagName === "TEXTAREA";
}, Pe = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Xt(e) && n[t] === "visible")
  );
}, Yt = function(e) {
  return Pe(e, "overflowY");
}, zt = function(e) {
  return Pe(e, "overflowX");
}, de = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Re(e, r);
    if (o) {
      var s = Oe(e, r), c = s[1], i = s[2];
      if (c > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Zt = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Gt = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Re = function(e, t) {
  return e === "v" ? Yt(t) : zt(t);
}, Oe = function(e, t) {
  return e === "v" ? Zt(t) : Gt(t);
}, qt = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Qt = function(e, t, n, r, o) {
  var s = qt(e, window.getComputedStyle(t).direction), c = s * r, i = n.target, f = t.contains(i), l = !1, v = c > 0, d = 0, m = 0;
  do {
    if (!i)
      break;
    var E = Oe(e, i), C = E[0], u = E[1], p = E[2], h = u - p - s * C;
    (C || h) && Re(e, i) && (d += h, m += C);
    var g = i.parentNode;
    i = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
  } while (
    // portaled content
    !f && i !== document.body || // self content
    f && (t.contains(i) || t === i)
  );
  return (v && Math.abs(d) < 1 || !v && Math.abs(m) < 1) && (l = !0), l;
}, j = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ve = function(e) {
  return [e.deltaX, e.deltaY];
}, pe = function(e) {
  return e && "current" in e ? e.current : e;
}, Jt = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, en = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, tn = 0, x = [];
function nn(e) {
  var t = a.useRef([]), n = a.useRef([0, 0]), r = a.useRef(), o = a.useState(tn++)[0], s = a.useState(Ce)[0], c = a.useRef(e);
  a.useEffect(function() {
    c.current = e;
  }, [e]), a.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var u = Ct([e.lockRef.current], (e.shards || []).map(pe), !0).filter(Boolean);
      return u.forEach(function(p) {
        return p.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), u.forEach(function(p) {
          return p.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = a.useCallback(function(u, p) {
    if ("touches" in u && u.touches.length === 2 || u.type === "wheel" && u.ctrlKey)
      return !c.current.allowPinchZoom;
    var h = j(u), g = n.current, b = "deltaX" in u ? u.deltaX : g[0] - h[0], S = "deltaY" in u ? u.deltaY : g[1] - h[1], w, R = u.target, y = Math.abs(b) > Math.abs(S) ? "h" : "v";
    if ("touches" in u && y === "h" && R.type === "range")
      return !1;
    var T = window.getSelection(), A = T && T.anchorNode, I = A ? A === R || A.contains(R) : !1;
    if (I)
      return !1;
    var M = de(y, R);
    if (!M)
      return !0;
    if (M ? w = y : (w = y === "v" ? "h" : "v", M = de(y, R)), !M)
      return !1;
    if (!r.current && "changedTouches" in u && (b || S) && (r.current = w), !w)
      return !0;
    var ne = r.current || w;
    return Qt(ne, p, u, ne === "h" ? b : S);
  }, []), f = a.useCallback(function(u) {
    var p = u;
    if (!(!x.length || x[x.length - 1] !== s)) {
      var h = "deltaY" in p ? ve(p) : j(p), g = t.current.filter(function(w) {
        return w.name === p.type && (w.target === p.target || p.target === w.shadowParent) && Jt(w.delta, h);
      })[0];
      if (g && g.should) {
        p.cancelable && p.preventDefault();
        return;
      }
      if (!g) {
        var b = (c.current.shards || []).map(pe).filter(Boolean).filter(function(w) {
          return w.contains(p.target);
        }), S = b.length > 0 ? i(p, b[0]) : !c.current.noIsolation;
        S && p.cancelable && p.preventDefault();
      }
    }
  }, []), l = a.useCallback(function(u, p, h, g) {
    var b = { name: u, delta: p, target: h, should: g, shadowParent: rn(h) };
    t.current.push(b), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== b;
      });
    }, 1);
  }, []), v = a.useCallback(function(u) {
    n.current = j(u), r.current = void 0;
  }, []), d = a.useCallback(function(u) {
    l(u.type, ve(u), u.target, i(u, e.lockRef.current));
  }, []), m = a.useCallback(function(u) {
    l(u.type, j(u), u.target, i(u, e.lockRef.current));
  }, []);
  a.useEffect(function() {
    return x.push(s), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", f, D), document.addEventListener("touchmove", f, D), document.addEventListener("touchstart", v, D), function() {
      x = x.filter(function(u) {
        return u !== s;
      }), document.removeEventListener("wheel", f, D), document.removeEventListener("touchmove", f, D), document.removeEventListener("touchstart", v, D);
    };
  }, []);
  var E = e.removeScrollBar, C = e.inert;
  return a.createElement(
    a.Fragment,
    null,
    C ? a.createElement(s, { styles: en(o) }) : null,
    E ? a.createElement(Kt, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function rn(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const on = xt(we, nn);
var an = a.forwardRef(function(e, t) {
  return a.createElement(H, O({}, e, { ref: t, sideCar: on }));
});
an.classNames = H.classNames;
export {
  He as D,
  rt as F,
  gt as P,
  an as R,
  pn as h,
  vn as u
};
