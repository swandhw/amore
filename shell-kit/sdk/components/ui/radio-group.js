import { j as u } from "../../jsx-runtime.js";
import * as s from "react";
import { c as D, d as me, e as I, b as L } from "../../index6.js";
import { c as V, u as x } from "../../index4.js";
import "react-dom";
import { c as ve, u as $ } from "../../index10.js";
import { u as Re } from "../../index7.js";
import { u as ye, a as be } from "../../index9.js";
import { P as ge } from "../../index5.js";
import { Circle as he } from "lucide-react";
import { c as M } from "../../utils.js";
// @__NO_SIDE_EFFECTS__
function Ie(e) {
  const r = /* @__PURE__ */ Ce(e), o = s.forwardRef((t, n) => {
    const { children: i, ...a } = t, c = s.Children.toArray(i), l = c.find(we);
    if (l) {
      const d = l.props.children, f = c.map((m) => m === l ? s.Children.count(d) > 1 ? s.Children.only(null) : s.isValidElement(d) ? d.props.children : null : m);
      return /* @__PURE__ */ u.jsx(r, { ...a, ref: n, children: s.isValidElement(d) ? s.cloneElement(d, void 0, f) : null });
    }
    return /* @__PURE__ */ u.jsx(r, { ...a, ref: n, children: i });
  });
  return o.displayName = `${e}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  const r = s.forwardRef((o, t) => {
    const { children: n, ...i } = o;
    if (s.isValidElement(n)) {
      const a = xe(n), c = Se(i, n.props);
      return n.type !== s.Fragment && (c.ref = t ? V(t, a) : a), s.cloneElement(n, c);
    }
    return s.Children.count(n) > 1 ? s.Children.only(null) : null;
  });
  return r.displayName = `${e}.SlotClone`, r;
}
var Ee = /* @__PURE__ */ Symbol("radix.slottable");
function we(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ee;
}
function Se(e, r) {
  const o = { ...r };
  for (const t in r) {
    const n = e[t], i = r[t];
    /^on[A-Z]/.test(t) ? n && i ? o[t] = (...c) => {
      const l = i(...c);
      return n(...c), l;
    } : n && (o[t] = n) : t === "style" ? o[t] = { ...n, ...i } : t === "className" && (o[t] = [n, i].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function xe(e) {
  let r = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? e.ref : (r = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
var Pe = [
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
], P = Pe.reduce((e, r) => {
  const o = /* @__PURE__ */ Ie(`Primitive.${r}`), t = s.forwardRef((n, i) => {
    const { asChild: a, ...c } = n, l = a ? o : r;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(l, { ...c, ref: i });
  });
  return t.displayName = `Primitive.${r}`, { ...e, [r]: t };
}, {});
// @__NO_SIDE_EFFECTS__
function _e(e) {
  const r = /* @__PURE__ */ Ne(e), o = s.forwardRef((t, n) => {
    const { children: i, ...a } = t, c = s.Children.toArray(i), l = c.find(Ae);
    if (l) {
      const d = l.props.children, f = c.map((m) => m === l ? s.Children.count(d) > 1 ? s.Children.only(null) : s.isValidElement(d) ? d.props.children : null : m);
      return /* @__PURE__ */ u.jsx(r, { ...a, ref: n, children: s.isValidElement(d) ? s.cloneElement(d, void 0, f) : null });
    }
    return /* @__PURE__ */ u.jsx(r, { ...a, ref: n, children: i });
  });
  return o.displayName = `${e}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function Ne(e) {
  const r = s.forwardRef((o, t) => {
    const { children: n, ...i } = o;
    if (s.isValidElement(n)) {
      const a = Te(n), c = je(i, n.props);
      return n.type !== s.Fragment && (c.ref = t ? V(t, a) : a), s.cloneElement(n, c);
    }
    return s.Children.count(n) > 1 ? s.Children.only(null) : null;
  });
  return r.displayName = `${e}.SlotClone`, r;
}
var Fe = /* @__PURE__ */ Symbol("radix.slottable");
function Ae(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Fe;
}
function je(e, r) {
  const o = { ...r };
  for (const t in r) {
    const n = e[t], i = r[t];
    /^on[A-Z]/.test(t) ? n && i ? o[t] = (...c) => {
      const l = i(...c);
      return n(...c), l;
    } : n && (o[t] = n) : t === "style" ? o[t] = { ...n, ...i } : t === "className" && (o[t] = [n, i].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function Te(e) {
  let r = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning;
  return o ? e.ref : (r = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = r && "isReactWarning" in r && r.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
var De = [
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
], B = De.reduce((e, r) => {
  const o = /* @__PURE__ */ _e(`Primitive.${r}`), t = s.forwardRef((n, i) => {
    const { asChild: a, ...c } = n, l = a ? o : r;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u.jsx(l, { ...c, ref: i });
  });
  return t.displayName = `Primitive.${r}`, { ...e, [r]: t };
}, {}), j = "rovingFocusGroup.onEntryFocus", Oe = { bubbles: !1, cancelable: !0 }, S = "RovingFocusGroup", [T, K, Ge] = ve(S), [ke, U] = D(
  S,
  [Ge]
), [Le, Ve] = ke(S), W = s.forwardRef(
  (e, r) => /* @__PURE__ */ u.jsx(T.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u.jsx(T.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u.jsx($e, { ...e, ref: r }) }) })
);
W.displayName = S;
var $e = s.forwardRef((e, r) => {
  const {
    __scopeRovingFocusGroup: o,
    orientation: t,
    loop: n = !1,
    dir: i,
    currentTabStopId: a,
    defaultCurrentTabStopId: c,
    onCurrentTabStopIdChange: l,
    onEntryFocus: d,
    preventScrollOnEntryFocus: f = !1,
    ...m
  } = e, y = s.useRef(null), v = x(r, y), R = $(i), [g, p] = L({
    prop: a,
    defaultProp: c ?? null,
    onChange: l,
    caller: S
  }), [C, N] = s.useState(!1), h = Re(d), E = K(o), F = s.useRef(!1), [le, G] = s.useState(0);
  return s.useEffect(() => {
    const b = y.current;
    if (b)
      return b.addEventListener(j, h), () => b.removeEventListener(j, h);
  }, [h]), /* @__PURE__ */ u.jsx(
    Le,
    {
      scope: o,
      orientation: t,
      dir: R,
      loop: n,
      currentTabStopId: g,
      onItemFocus: s.useCallback(
        (b) => p(b),
        [p]
      ),
      onItemShiftTab: s.useCallback(() => N(!0), []),
      onFocusableItemAdd: s.useCallback(
        () => G((b) => b + 1),
        []
      ),
      onFocusableItemRemove: s.useCallback(
        () => G((b) => b - 1),
        []
      ),
      children: /* @__PURE__ */ u.jsx(
        B.div,
        {
          tabIndex: C || le === 0 ? -1 : 0,
          "data-orientation": t,
          ...m,
          ref: v,
          style: { outline: "none", ...e.style },
          onMouseDown: I(e.onMouseDown, () => {
            F.current = !0;
          }),
          onFocus: I(e.onFocus, (b) => {
            const ue = !F.current;
            if (b.target === b.currentTarget && ue && !C) {
              const k = new CustomEvent(j, Oe);
              if (b.currentTarget.dispatchEvent(k), !k.defaultPrevented) {
                const A = E().filter((w) => w.focusable), de = A.find((w) => w.active), fe = A.find((w) => w.id === g), pe = [de, fe, ...A].filter(
                  Boolean
                ).map((w) => w.ref.current);
                Y(pe, f);
              }
            }
            F.current = !1;
          }),
          onBlur: I(e.onBlur, () => N(!1))
        }
      )
    }
  );
}), H = "RovingFocusGroupItem", q = s.forwardRef(
  (e, r) => {
    const {
      __scopeRovingFocusGroup: o,
      focusable: t = !0,
      active: n = !1,
      tabStopId: i,
      children: a,
      ...c
    } = e, l = me(), d = i || l, f = Ve(H, o), m = f.currentTabStopId === d, y = K(o), { onFocusableItemAdd: v, onFocusableItemRemove: R, currentTabStopId: g } = f;
    return s.useEffect(() => {
      if (t)
        return v(), () => R();
    }, [t, v, R]), /* @__PURE__ */ u.jsx(
      T.ItemSlot,
      {
        scope: o,
        id: d,
        focusable: t,
        active: n,
        children: /* @__PURE__ */ u.jsx(
          B.span,
          {
            tabIndex: m ? 0 : -1,
            "data-orientation": f.orientation,
            ...c,
            ref: r,
            onMouseDown: I(e.onMouseDown, (p) => {
              t ? f.onItemFocus(d) : p.preventDefault();
            }),
            onFocus: I(e.onFocus, () => f.onItemFocus(d)),
            onKeyDown: I(e.onKeyDown, (p) => {
              if (p.key === "Tab" && p.shiftKey) {
                f.onItemShiftTab();
                return;
              }
              if (p.target !== p.currentTarget) return;
              const C = Ke(p, f.orientation, f.dir);
              if (C !== void 0) {
                if (p.metaKey || p.ctrlKey || p.altKey || p.shiftKey) return;
                p.preventDefault();
                let h = y().filter((E) => E.focusable).map((E) => E.ref.current);
                if (C === "last") h.reverse();
                else if (C === "prev" || C === "next") {
                  C === "prev" && h.reverse();
                  const E = h.indexOf(p.currentTarget);
                  h = f.loop ? Ue(h, E + 1) : h.slice(E + 1);
                }
                setTimeout(() => Y(h));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: m, hasTabStop: g != null }) : a
          }
        )
      }
    );
  }
);
q.displayName = H;
var Me = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Be(e, r) {
  return r !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Ke(e, r, o) {
  const t = Be(e.key, o);
  if (!(r === "vertical" && ["ArrowLeft", "ArrowRight"].includes(t)) && !(r === "horizontal" && ["ArrowUp", "ArrowDown"].includes(t)))
    return Me[t];
}
function Y(e, r = !1) {
  const o = document.activeElement;
  for (const t of e)
    if (t === o || (t.focus({ preventScroll: r }), document.activeElement !== o)) return;
}
function Ue(e, r) {
  return e.map((o, t) => e[(r + t) % e.length]);
}
var We = W, He = q, O = "Radio", [qe, z] = D(O), [Ye, ze] = qe(O), Z = s.forwardRef(
  (e, r) => {
    const {
      __scopeRadio: o,
      name: t,
      checked: n = !1,
      required: i,
      disabled: a,
      value: c = "on",
      onCheck: l,
      form: d,
      ...f
    } = e, [m, y] = s.useState(null), v = x(r, (p) => y(p)), R = s.useRef(!1), g = m ? d || !!m.closest("form") : !0;
    return /* @__PURE__ */ u.jsxs(Ye, { scope: o, checked: n, disabled: a, children: [
      /* @__PURE__ */ u.jsx(
        P.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": n,
          "data-state": ee(n),
          "data-disabled": a ? "" : void 0,
          disabled: a,
          value: c,
          ...f,
          ref: v,
          onClick: I(e.onClick, (p) => {
            n || l?.(), g && (R.current = p.isPropagationStopped(), R.current || p.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ u.jsx(
        Q,
        {
          control: m,
          bubbles: !R.current,
          name: t,
          value: c,
          checked: n,
          required: i,
          disabled: a,
          form: d,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Z.displayName = O;
var X = "RadioIndicator", J = s.forwardRef(
  (e, r) => {
    const { __scopeRadio: o, forceMount: t, ...n } = e, i = ze(X, o);
    return /* @__PURE__ */ u.jsx(ge, { present: t || i.checked, children: /* @__PURE__ */ u.jsx(
      P.span,
      {
        "data-state": ee(i.checked),
        "data-disabled": i.disabled ? "" : void 0,
        ...n,
        ref: r
      }
    ) });
  }
);
J.displayName = X;
var Ze = "RadioBubbleInput", Q = s.forwardRef(
  ({
    __scopeRadio: e,
    control: r,
    checked: o,
    bubbles: t = !0,
    ...n
  }, i) => {
    const a = s.useRef(null), c = x(a, i), l = ye(o), d = be(r);
    return s.useEffect(() => {
      const f = a.current;
      if (!f) return;
      const m = window.HTMLInputElement.prototype, v = Object.getOwnPropertyDescriptor(
        m,
        "checked"
      ).set;
      if (l !== o && v) {
        const R = new Event("click", { bubbles: t });
        v.call(f, o), f.dispatchEvent(R);
      }
    }, [l, o, t]), /* @__PURE__ */ u.jsx(
      P.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: o,
        ...n,
        tabIndex: -1,
        ref: c,
        style: {
          ...n.style,
          ...d,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Q.displayName = Ze;
function ee(e) {
  return e ? "checked" : "unchecked";
}
var Xe = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], _ = "RadioGroup", [Je] = D(_, [
  U,
  z
]), re = U(), oe = z(), [Qe, er] = Je(_), te = s.forwardRef(
  (e, r) => {
    const {
      __scopeRadioGroup: o,
      name: t,
      defaultValue: n,
      value: i,
      required: a = !1,
      disabled: c = !1,
      orientation: l,
      dir: d,
      loop: f = !0,
      onValueChange: m,
      ...y
    } = e, v = re(o), R = $(d), [g, p] = L({
      prop: i,
      defaultProp: n ?? null,
      onChange: m,
      caller: _
    });
    return /* @__PURE__ */ u.jsx(
      Qe,
      {
        scope: o,
        name: t,
        required: a,
        disabled: c,
        value: g,
        onValueChange: p,
        children: /* @__PURE__ */ u.jsx(
          We,
          {
            asChild: !0,
            ...v,
            orientation: l,
            dir: R,
            loop: f,
            children: /* @__PURE__ */ u.jsx(
              P.div,
              {
                role: "radiogroup",
                "aria-required": a,
                "aria-orientation": l,
                "data-disabled": c ? "" : void 0,
                dir: R,
                ...y,
                ref: r
              }
            )
          }
        )
      }
    );
  }
);
te.displayName = _;
var ne = "RadioGroupItem", se = s.forwardRef(
  (e, r) => {
    const { __scopeRadioGroup: o, disabled: t, ...n } = e, i = er(ne, o), a = i.disabled || t, c = re(o), l = oe(o), d = s.useRef(null), f = x(r, d), m = i.value === n.value, y = s.useRef(!1);
    return s.useEffect(() => {
      const v = (g) => {
        Xe.includes(g.key) && (y.current = !0);
      }, R = () => y.current = !1;
      return document.addEventListener("keydown", v), document.addEventListener("keyup", R), () => {
        document.removeEventListener("keydown", v), document.removeEventListener("keyup", R);
      };
    }, []), /* @__PURE__ */ u.jsx(
      He,
      {
        asChild: !0,
        ...c,
        focusable: !a,
        active: m,
        children: /* @__PURE__ */ u.jsx(
          Z,
          {
            disabled: a,
            required: i.required,
            checked: m,
            ...l,
            ...n,
            name: i.name,
            ref: f,
            onCheck: () => i.onValueChange(n.value),
            onKeyDown: I((v) => {
              v.key === "Enter" && v.preventDefault();
            }),
            onFocus: I(n.onFocus, () => {
              y.current && d.current?.click();
            })
          }
        )
      }
    );
  }
);
se.displayName = ne;
var rr = "RadioGroupIndicator", ie = s.forwardRef(
  (e, r) => {
    const { __scopeRadioGroup: o, ...t } = e, n = oe(o);
    return /* @__PURE__ */ u.jsx(J, { ...n, ...t, ref: r });
  }
);
ie.displayName = rr;
var ae = te, ce = se, or = ie;
const tr = s.forwardRef(({ className: e, ...r }, o) => /* @__PURE__ */ u.jsx(
  ae,
  {
    className: M("grid gap-2", e),
    ...r,
    ref: o
  }
));
tr.displayName = ae.displayName;
const nr = s.forwardRef(({ className: e, ...r }, o) => /* @__PURE__ */ u.jsx(
  ce,
  {
    ref: o,
    className: M(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ...r,
    children: /* @__PURE__ */ u.jsx(or, { className: "flex items-center justify-center", children: /* @__PURE__ */ u.jsx(he, { className: "h-3.5 w-3.5 fill-primary" }) })
  }
));
nr.displayName = ce.displayName;
export {
  tr as RadioGroup,
  nr as RadioGroupItem
};
