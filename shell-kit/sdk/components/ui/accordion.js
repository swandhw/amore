import { j as c } from "../../jsx-runtime.js";
import * as a from "react";
import v from "react";
import { ChevronDownIcon as pe } from "lucide-react";
import { c as D } from "../../utils.js";
import { c as F, b as $, d as B, e as G, u as ue } from "../../index6.js";
import { c as fe, u as me } from "../../index10.js";
import { c as K, u as z } from "../../index4.js";
import "react-dom";
import { P as ve } from "../../index5.js";
// @__NO_SIDE_EFFECTS__
function Ce(e) {
  const o = /* @__PURE__ */ ge(e), t = a.forwardRef((r, n) => {
    const { children: i, ...l } = r, s = a.Children.toArray(i), d = s.find(xe);
    if (d) {
      const p = d.props.children, m = s.map((f) => f === d ? a.Children.count(p) > 1 ? a.Children.only(null) : a.isValidElement(p) ? p.props.children : null : f);
      return /* @__PURE__ */ c.jsx(o, { ...l, ref: n, children: a.isValidElement(p) ? a.cloneElement(p, void 0, m) : null });
    }
    return /* @__PURE__ */ c.jsx(o, { ...l, ref: n, children: i });
  });
  return t.displayName = `${e}.Slot`, t;
}
// @__NO_SIDE_EFFECTS__
function ge(e) {
  const o = a.forwardRef((t, r) => {
    const { children: n, ...i } = t;
    if (a.isValidElement(n)) {
      const l = ye(n), s = he(i, n.props);
      return n.type !== a.Fragment && (s.ref = r ? K(r, l) : l), a.cloneElement(n, s);
    }
    return a.Children.count(n) > 1 ? a.Children.only(null) : null;
  });
  return o.displayName = `${e}.SlotClone`, o;
}
var be = /* @__PURE__ */ Symbol("radix.slottable");
function xe(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === be;
}
function he(e, o) {
  const t = { ...o };
  for (const r in o) {
    const n = e[r], i = o[r];
    /^on[A-Z]/.test(r) ? n && i ? t[r] = (...s) => {
      const d = i(...s);
      return n(...s), d;
    } : n && (t[r] = n) : r === "style" ? t[r] = { ...n, ...i } : r === "className" && (t[r] = [n, i].filter(Boolean).join(" "));
  }
  return { ...e, ...t };
}
function ye(e) {
  let o = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, t = o && "isReactWarning" in o && o.isReactWarning;
  return t ? e.ref : (o = Object.getOwnPropertyDescriptor(e, "ref")?.get, t = o && "isReactWarning" in o && o.isReactWarning, t ? e.props.ref : e.props.ref || e.ref);
}
var Ae = [
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
], U = Ae.reduce((e, o) => {
  const t = /* @__PURE__ */ Ce(`Primitive.${o}`), r = a.forwardRef((n, i) => {
    const { asChild: l, ...s } = n, d = l ? t : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c.jsx(d, { ...s, ref: i });
  });
  return r.displayName = `Primitive.${o}`, { ...e, [o]: r };
}, {});
// @__NO_SIDE_EFFECTS__
function Re(e) {
  const o = /* @__PURE__ */ Ie(e), t = a.forwardRef((r, n) => {
    const { children: i, ...l } = r, s = a.Children.toArray(i), d = s.find(Pe);
    if (d) {
      const p = d.props.children, m = s.map((f) => f === d ? a.Children.count(p) > 1 ? a.Children.only(null) : a.isValidElement(p) ? p.props.children : null : f);
      return /* @__PURE__ */ c.jsx(o, { ...l, ref: n, children: a.isValidElement(p) ? a.cloneElement(p, void 0, m) : null });
    }
    return /* @__PURE__ */ c.jsx(o, { ...l, ref: n, children: i });
  });
  return t.displayName = `${e}.Slot`, t;
}
// @__NO_SIDE_EFFECTS__
function Ie(e) {
  const o = a.forwardRef((t, r) => {
    const { children: n, ...i } = t;
    if (a.isValidElement(n)) {
      const l = Ne(n), s = _e(i, n.props);
      return n.type !== a.Fragment && (s.ref = r ? K(r, l) : l), a.cloneElement(n, s);
    }
    return a.Children.count(n) > 1 ? a.Children.only(null) : null;
  });
  return o.displayName = `${e}.SlotClone`, o;
}
var we = /* @__PURE__ */ Symbol("radix.slottable");
function Pe(e) {
  return a.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === we;
}
function _e(e, o) {
  const t = { ...o };
  for (const r in o) {
    const n = e[r], i = o[r];
    /^on[A-Z]/.test(r) ? n && i ? t[r] = (...s) => {
      const d = i(...s);
      return n(...s), d;
    } : n && (t[r] = n) : r === "style" ? t[r] = { ...n, ...i } : r === "className" && (t[r] = [n, i].filter(Boolean).join(" "));
  }
  return { ...e, ...t };
}
function Ne(e) {
  let o = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, t = o && "isReactWarning" in o && o.isReactWarning;
  return t ? e.ref : (o = Object.getOwnPropertyDescriptor(e, "ref")?.get, t = o && "isReactWarning" in o && o.isReactWarning, t ? e.props.ref : e.props.ref || e.ref);
}
var Ee = [
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
], T = Ee.reduce((e, o) => {
  const t = /* @__PURE__ */ Re(`Primitive.${o}`), r = a.forwardRef((n, i) => {
    const { asChild: l, ...s } = n, d = l ? t : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c.jsx(d, { ...s, ref: i });
  });
  return r.displayName = `Primitive.${o}`, { ...e, [o]: r };
}, {}), w = "Collapsible", [je, Z] = F(w), [Se, V] = je(w), q = a.forwardRef(
  (e, o) => {
    const {
      __scopeCollapsible: t,
      open: r,
      defaultOpen: n,
      disabled: i,
      onOpenChange: l,
      ...s
    } = e, [d, p] = $({
      prop: r,
      defaultProp: n ?? !1,
      onChange: l,
      caller: w
    });
    return /* @__PURE__ */ c.jsx(
      Se,
      {
        scope: t,
        disabled: i,
        contentId: B(),
        open: d,
        onOpenToggle: a.useCallback(() => p((m) => !m), [p]),
        children: /* @__PURE__ */ c.jsx(
          T.div,
          {
            "data-state": M(d),
            "data-disabled": i ? "" : void 0,
            ...s,
            ref: o
          }
        )
      }
    );
  }
);
q.displayName = w;
var Y = "CollapsibleTrigger", J = a.forwardRef(
  (e, o) => {
    const { __scopeCollapsible: t, ...r } = e, n = V(Y, t);
    return /* @__PURE__ */ c.jsx(
      T.button,
      {
        type: "button",
        "aria-controls": n.contentId,
        "aria-expanded": n.open || !1,
        "data-state": M(n.open),
        "data-disabled": n.disabled ? "" : void 0,
        disabled: n.disabled,
        ...r,
        ref: o,
        onClick: G(e.onClick, n.onOpenToggle)
      }
    );
  }
);
J.displayName = Y;
var k = "CollapsibleContent", Q = a.forwardRef(
  (e, o) => {
    const { forceMount: t, ...r } = e, n = V(k, e.__scopeCollapsible);
    return /* @__PURE__ */ c.jsx(ve, { present: t || n.open, children: ({ present: i }) => /* @__PURE__ */ c.jsx(Oe, { ...r, ref: o, present: i }) });
  }
);
Q.displayName = k;
var Oe = a.forwardRef((e, o) => {
  const { __scopeCollapsible: t, present: r, children: n, ...i } = e, l = V(k, t), [s, d] = a.useState(r), p = a.useRef(null), m = z(o, p), f = a.useRef(0), y = f.current, g = a.useRef(0), R = g.current, b = l.open || s, x = a.useRef(b), h = a.useRef(void 0);
  return a.useEffect(() => {
    const u = requestAnimationFrame(() => x.current = !1);
    return () => cancelAnimationFrame(u);
  }, []), ue(() => {
    const u = p.current;
    if (u) {
      h.current = h.current || {
        transitionDuration: u.style.transitionDuration,
        animationName: u.style.animationName
      }, u.style.transitionDuration = "0s", u.style.animationName = "none";
      const A = u.getBoundingClientRect();
      f.current = A.height, g.current = A.width, x.current || (u.style.transitionDuration = h.current.transitionDuration, u.style.animationName = h.current.animationName), d(r);
    }
  }, [l.open, r]), /* @__PURE__ */ c.jsx(
    T.div,
    {
      "data-state": M(l.open),
      "data-disabled": l.disabled ? "" : void 0,
      id: l.contentId,
      hidden: !b,
      ...i,
      ref: m,
      style: {
        "--radix-collapsible-content-height": y ? `${y}px` : void 0,
        "--radix-collapsible-content-width": R ? `${R}px` : void 0,
        ...e.style
      },
      children: b && n
    }
  );
});
function M(e) {
  return e ? "open" : "closed";
}
var De = q, $e = J, Te = Q, C = "Accordion", Ve = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [H, ke, Me] = fe(C), [P] = F(C, [
  Me,
  Z
]), L = Z(), X = v.forwardRef(
  (e, o) => {
    const { type: t, ...r } = e, n = r, i = r;
    return /* @__PURE__ */ c.jsx(H.Provider, { scope: e.__scopeAccordion, children: t === "multiple" ? /* @__PURE__ */ c.jsx(Fe, { ...i, ref: o }) : /* @__PURE__ */ c.jsx(We, { ...n, ref: o }) });
  }
);
X.displayName = C;
var [ee, He] = P(C), [oe, Le] = P(
  C,
  { collapsible: !1 }
), We = v.forwardRef(
  (e, o) => {
    const {
      value: t,
      defaultValue: r,
      onValueChange: n = () => {
      },
      collapsible: i = !1,
      ...l
    } = e, [s, d] = $({
      prop: t,
      defaultProp: r ?? "",
      onChange: n,
      caller: C
    });
    return /* @__PURE__ */ c.jsx(
      ee,
      {
        scope: e.__scopeAccordion,
        value: v.useMemo(() => s ? [s] : [], [s]),
        onItemOpen: d,
        onItemClose: v.useCallback(() => i && d(""), [i, d]),
        children: /* @__PURE__ */ c.jsx(oe, { scope: e.__scopeAccordion, collapsible: i, children: /* @__PURE__ */ c.jsx(te, { ...l, ref: o }) })
      }
    );
  }
), Fe = v.forwardRef((e, o) => {
  const {
    value: t,
    defaultValue: r,
    onValueChange: n = () => {
    },
    ...i
  } = e, [l, s] = $({
    prop: t,
    defaultProp: r ?? [],
    onChange: n,
    caller: C
  }), d = v.useCallback(
    (m) => s((f = []) => [...f, m]),
    [s]
  ), p = v.useCallback(
    (m) => s((f = []) => f.filter((y) => y !== m)),
    [s]
  );
  return /* @__PURE__ */ c.jsx(
    ee,
    {
      scope: e.__scopeAccordion,
      value: l,
      onItemOpen: d,
      onItemClose: p,
      children: /* @__PURE__ */ c.jsx(oe, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ c.jsx(te, { ...i, ref: o }) })
    }
  );
}), [Be, _] = P(C), te = v.forwardRef(
  (e, o) => {
    const { __scopeAccordion: t, disabled: r, dir: n, orientation: i = "vertical", ...l } = e, s = v.useRef(null), d = z(s, o), p = ke(t), f = me(n) === "ltr", y = G(e.onKeyDown, (g) => {
      if (!Ve.includes(g.key)) return;
      const R = g.target, b = p().filter((S) => !S.ref.current?.disabled), x = b.findIndex((S) => S.ref.current === R), h = b.length;
      if (x === -1) return;
      g.preventDefault();
      let u = x;
      const A = 0, N = h - 1, E = () => {
        u = x + 1, u > N && (u = A);
      }, j = () => {
        u = x - 1, u < A && (u = N);
      };
      switch (g.key) {
        case "Home":
          u = A;
          break;
        case "End":
          u = N;
          break;
        case "ArrowRight":
          i === "horizontal" && (f ? E() : j());
          break;
        case "ArrowDown":
          i === "vertical" && E();
          break;
        case "ArrowLeft":
          i === "horizontal" && (f ? j() : E());
          break;
        case "ArrowUp":
          i === "vertical" && j();
          break;
      }
      const de = u % h;
      b[de].ref.current?.focus();
    });
    return /* @__PURE__ */ c.jsx(
      Be,
      {
        scope: t,
        disabled: r,
        direction: n,
        orientation: i,
        children: /* @__PURE__ */ c.jsx(H.Slot, { scope: t, children: /* @__PURE__ */ c.jsx(
          U.div,
          {
            ...l,
            "data-orientation": i,
            ref: d,
            onKeyDown: r ? void 0 : y
          }
        ) })
      }
    );
  }
), I = "AccordionItem", [Ge, W] = P(I), ne = v.forwardRef(
  (e, o) => {
    const { __scopeAccordion: t, value: r, ...n } = e, i = _(I, t), l = He(I, t), s = L(t), d = B(), p = r && l.value.includes(r) || !1, m = i.disabled || e.disabled;
    return /* @__PURE__ */ c.jsx(
      Ge,
      {
        scope: t,
        open: p,
        disabled: m,
        triggerId: d,
        children: /* @__PURE__ */ c.jsx(
          De,
          {
            "data-orientation": i.orientation,
            "data-state": ce(p),
            ...s,
            ...n,
            ref: o,
            disabled: m,
            open: p,
            onOpenChange: (f) => {
              f ? l.onItemOpen(r) : l.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
ne.displayName = I;
var re = "AccordionHeader", ie = v.forwardRef(
  (e, o) => {
    const { __scopeAccordion: t, ...r } = e, n = _(C, t), i = W(re, t);
    return /* @__PURE__ */ c.jsx(
      U.h3,
      {
        "data-orientation": n.orientation,
        "data-state": ce(i.open),
        "data-disabled": i.disabled ? "" : void 0,
        ...r,
        ref: o
      }
    );
  }
);
ie.displayName = re;
var O = "AccordionTrigger", ae = v.forwardRef(
  (e, o) => {
    const { __scopeAccordion: t, ...r } = e, n = _(C, t), i = W(O, t), l = Le(O, t), s = L(t);
    return /* @__PURE__ */ c.jsx(H.ItemSlot, { scope: t, children: /* @__PURE__ */ c.jsx(
      $e,
      {
        "aria-disabled": i.open && !l.collapsible || void 0,
        "data-orientation": n.orientation,
        id: i.triggerId,
        ...s,
        ...r,
        ref: o
      }
    ) });
  }
);
ae.displayName = O;
var se = "AccordionContent", le = v.forwardRef(
  (e, o) => {
    const { __scopeAccordion: t, ...r } = e, n = _(C, t), i = W(se, t), l = L(t);
    return /* @__PURE__ */ c.jsx(
      Te,
      {
        role: "region",
        "aria-labelledby": i.triggerId,
        "data-orientation": n.orientation,
        ...l,
        ...r,
        ref: o,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...e.style
        }
      }
    );
  }
);
le.displayName = se;
function ce(e) {
  return e ? "open" : "closed";
}
var Ke = X, ze = ne, Ue = ie, Ze = ae, qe = le;
function io({
  ...e
}) {
  return /* @__PURE__ */ c.jsx(Ke, { "data-slot": "accordion", ...e });
}
function ao({
  className: e,
  ...o
}) {
  return /* @__PURE__ */ c.jsx(
    ze,
    {
      "data-slot": "accordion-item",
      className: D("border-b last:border-b-0", e),
      ...o
    }
  );
}
function so({
  className: e,
  children: o,
  ...t
}) {
  return /* @__PURE__ */ c.jsx(Ue, { className: "flex", children: /* @__PURE__ */ c.jsxs(
    Ze,
    {
      "data-slot": "accordion-trigger",
      className: D(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        e
      ),
      ...t,
      children: [
        o,
        /* @__PURE__ */ c.jsx(pe, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function lo({
  className: e,
  children: o,
  ...t
}) {
  return /* @__PURE__ */ c.jsx(
    qe,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...t,
      children: /* @__PURE__ */ c.jsx("div", { className: D("pt-0 pb-4", e), children: o })
    }
  );
}
export {
  io as Accordion,
  lo as AccordionContent,
  ao as AccordionItem,
  so as AccordionTrigger
};
