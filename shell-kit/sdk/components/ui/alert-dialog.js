import { j as n } from "../../jsx-runtime.js";
import * as s from "react";
import { c as P, a as ce, b as de, d as N, e as v } from "../../index6.js";
import { c as ue, u as A } from "../../index4.js";
import { P as ge, h as pe, R as fe, u as me, F as ve, D as De } from "../../Combination.js";
import { P as R } from "../../index5.js";
import "react-dom";
import { c as p } from "../../utils.js";
import { Button as O } from "./button.js";
// @__NO_SIDE_EFFECTS__
function S(e) {
  const t = /* @__PURE__ */ xe(e), o = s.forwardRef((r, a) => {
    const { children: i, ...l } = r, c = s.Children.toArray(i), d = c.find(ye);
    if (d) {
      const u = d.props.children, x = c.map((h) => h === d ? s.Children.count(u) > 1 ? s.Children.only(null) : s.isValidElement(u) ? u.props.children : null : h);
      return /* @__PURE__ */ n.jsx(t, { ...l, ref: a, children: s.isValidElement(u) ? s.cloneElement(u, void 0, x) : null });
    }
    return /* @__PURE__ */ n.jsx(t, { ...l, ref: a, children: i });
  });
  return o.displayName = `${e}.Slot`, o;
}
// @__NO_SIDE_EFFECTS__
function xe(e) {
  const t = s.forwardRef((o, r) => {
    const { children: a, ...i } = o;
    if (s.isValidElement(a)) {
      const l = Ce(a), c = he(i, a.props);
      return a.type !== s.Fragment && (c.ref = r ? ue(r, l) : l), s.cloneElement(a, c);
    }
    return s.Children.count(a) > 1 ? s.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ae = /* @__PURE__ */ Symbol("radix.slottable");
function ye(e) {
  return s.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ae;
}
function he(e, t) {
  const o = { ...t };
  for (const r in t) {
    const a = e[r], i = t[r];
    /^on[A-Z]/.test(r) ? a && i ? o[r] = (...c) => {
      const d = i(...c);
      return a(...c), d;
    } : a && (o[r] = a) : r === "style" ? o[r] = { ...a, ...i } : r === "className" && (o[r] = [a, i].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function Ce(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = t && "isReactWarning" in t && t.isReactWarning;
  return o ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = t && "isReactWarning" in t && t.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
var _e = [
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
], y = _e.reduce((e, t) => {
  const o = /* @__PURE__ */ S(`Primitive.${t}`), r = s.forwardRef((a, i) => {
    const { asChild: l, ...c } = a, d = l ? o : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ n.jsx(d, { ...c, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), _ = "Dialog", [w, I] = P(_), [Ne, g] = w(_), T = (e) => {
  const {
    __scopeDialog: t,
    children: o,
    open: r,
    defaultOpen: a,
    onOpenChange: i,
    modal: l = !0
  } = e, c = s.useRef(null), d = s.useRef(null), [u, x] = de({
    prop: r,
    defaultProp: a ?? !1,
    onChange: i,
    caller: _
  });
  return /* @__PURE__ */ n.jsx(
    Ne,
    {
      scope: t,
      triggerRef: c,
      contentRef: d,
      contentId: N(),
      titleId: N(),
      descriptionId: N(),
      open: u,
      onOpenChange: x,
      onOpenToggle: s.useCallback(() => x((h) => !h), [x]),
      modal: l,
      children: o
    }
  );
};
T.displayName = _;
var M = "DialogTrigger", $ = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...r } = e, a = g(M, o), i = A(t, a.triggerRef);
    return /* @__PURE__ */ n.jsx(
      y.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": a.open,
        "aria-controls": a.contentId,
        "data-state": b(a.open),
        ...r,
        ref: i,
        onClick: v(e.onClick, a.onOpenToggle)
      }
    );
  }
);
$.displayName = M;
var E = "DialogPortal", [Re, F] = w(E, {
  forceMount: void 0
}), W = (e) => {
  const { __scopeDialog: t, forceMount: o, children: r, container: a } = e, i = g(E, t);
  return /* @__PURE__ */ n.jsx(Re, { scope: t, forceMount: o, children: s.Children.map(r, (l) => /* @__PURE__ */ n.jsx(R, { present: o || i.open, children: /* @__PURE__ */ n.jsx(ge, { asChild: !0, container: a, children: l }) })) });
};
W.displayName = E;
var C = "DialogOverlay", z = s.forwardRef(
  (e, t) => {
    const o = F(C, e.__scopeDialog), { forceMount: r = o.forceMount, ...a } = e, i = g(C, e.__scopeDialog);
    return i.modal ? /* @__PURE__ */ n.jsx(R, { present: r || i.open, children: /* @__PURE__ */ n.jsx(je, { ...a, ref: t }) }) : null;
  }
);
z.displayName = C;
var Ee = /* @__PURE__ */ S("DialogOverlay.RemoveScroll"), je = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...r } = e, a = g(C, o);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ n.jsx(fe, { as: Ee, allowPinchZoom: !0, shards: [a.contentRef], children: /* @__PURE__ */ n.jsx(
        y.div,
        {
          "data-state": b(a.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), m = "DialogContent", L = s.forwardRef(
  (e, t) => {
    const o = F(m, e.__scopeDialog), { forceMount: r = o.forceMount, ...a } = e, i = g(m, e.__scopeDialog);
    return /* @__PURE__ */ n.jsx(R, { present: r || i.open, children: i.modal ? /* @__PURE__ */ n.jsx(be, { ...a, ref: t }) : /* @__PURE__ */ n.jsx(Pe, { ...a, ref: t }) });
  }
);
L.displayName = m;
var be = s.forwardRef(
  (e, t) => {
    const o = g(m, e.__scopeDialog), r = s.useRef(null), a = A(t, o.contentRef, r);
    return s.useEffect(() => {
      const i = r.current;
      if (i) return pe(i);
    }, []), /* @__PURE__ */ n.jsx(
      G,
      {
        ...e,
        ref: a,
        trapFocus: o.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: v(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), o.triggerRef.current?.focus();
        }),
        onPointerDownOutside: v(e.onPointerDownOutside, (i) => {
          const l = i.detail.originalEvent, c = l.button === 0 && l.ctrlKey === !0;
          (l.button === 2 || c) && i.preventDefault();
        }),
        onFocusOutside: v(
          e.onFocusOutside,
          (i) => i.preventDefault()
        )
      }
    );
  }
), Pe = s.forwardRef(
  (e, t) => {
    const o = g(m, e.__scopeDialog), r = s.useRef(!1), a = s.useRef(!1);
    return /* @__PURE__ */ n.jsx(
      G,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (i) => {
          e.onCloseAutoFocus?.(i), i.defaultPrevented || (r.current || o.triggerRef.current?.focus(), i.preventDefault()), r.current = !1, a.current = !1;
        },
        onInteractOutside: (i) => {
          e.onInteractOutside?.(i), i.defaultPrevented || (r.current = !0, i.detail.originalEvent.type === "pointerdown" && (a.current = !0));
          const l = i.target;
          o.triggerRef.current?.contains(l) && i.preventDefault(), i.detail.originalEvent.type === "focusin" && a.current && i.preventDefault();
        }
      }
    );
  }
), G = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, trapFocus: r, onOpenAutoFocus: a, onCloseAutoFocus: i, ...l } = e, c = g(m, o), d = s.useRef(null), u = A(t, d);
    return me(), /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
      /* @__PURE__ */ n.jsx(
        ve,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: a,
          onUnmountAutoFocus: i,
          children: /* @__PURE__ */ n.jsx(
            De,
            {
              role: "dialog",
              id: c.contentId,
              "aria-describedby": c.descriptionId,
              "aria-labelledby": c.titleId,
              "data-state": b(c.open),
              ...l,
              ref: u,
              onDismiss: () => c.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
        /* @__PURE__ */ n.jsx(Se, { titleId: c.titleId }),
        /* @__PURE__ */ n.jsx(Ie, { contentRef: d, descriptionId: c.descriptionId })
      ] })
    ] });
  }
), j = "DialogTitle", k = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...r } = e, a = g(j, o);
    return /* @__PURE__ */ n.jsx(y.h2, { id: a.titleId, ...r, ref: t });
  }
);
k.displayName = j;
var V = "DialogDescription", B = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...r } = e, a = g(V, o);
    return /* @__PURE__ */ n.jsx(y.p, { id: a.descriptionId, ...r, ref: t });
  }
);
B.displayName = V;
var H = "DialogClose", Y = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...r } = e, a = g(H, o);
    return /* @__PURE__ */ n.jsx(
      y.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: v(e.onClick, () => a.onOpenChange(!1))
      }
    );
  }
);
Y.displayName = H;
function b(e) {
  return e ? "open" : "closed";
}
var q = "DialogTitleWarning", [Oe, Z] = ce(q, {
  contentName: m,
  titleName: j,
  docsSlug: "dialog"
}), Se = ({ titleId: e }) => {
  const t = Z(q), o = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return s.useEffect(() => {
    e && (document.getElementById(e) || console.error(o));
  }, [o, e]), null;
}, we = "DialogDescriptionWarning", Ie = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Z(we).contentName}}.`;
  return s.useEffect(() => {
    const a = e.current?.getAttribute("aria-describedby");
    t && a && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, Te = T, Me = $, $e = W, Fe = z, We = L, ze = k, Le = B, K = Y, Ge = /* @__PURE__ */ Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function ke(e) {
  const t = ({ children: o }) => /* @__PURE__ */ n.jsx(n.Fragment, { children: o });
  return t.displayName = `${e}.Slottable`, t.__radixId = Ge, t;
}
var U = "AlertDialog", [Ve] = P(U, [
  I
]), f = I(), J = (e) => {
  const { __scopeAlertDialog: t, ...o } = e, r = f(t);
  return /* @__PURE__ */ n.jsx(Te, { ...r, ...o, modal: !0 });
};
J.displayName = U;
var Be = "AlertDialogTrigger", Q = s.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...r } = e, a = f(o);
    return /* @__PURE__ */ n.jsx(Me, { ...a, ...r, ref: t });
  }
);
Q.displayName = Be;
var He = "AlertDialogPortal", X = (e) => {
  const { __scopeAlertDialog: t, ...o } = e, r = f(t);
  return /* @__PURE__ */ n.jsx($e, { ...r, ...o });
};
X.displayName = He;
var Ye = "AlertDialogOverlay", ee = s.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...r } = e, a = f(o);
    return /* @__PURE__ */ n.jsx(Fe, { ...a, ...r, ref: t });
  }
);
ee.displayName = Ye;
var D = "AlertDialogContent", [qe, Ze] = Ve(D), Ke = /* @__PURE__ */ ke("AlertDialogContent"), te = s.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, children: r, ...a } = e, i = f(o), l = s.useRef(null), c = A(t, l), d = s.useRef(null);
    return /* @__PURE__ */ n.jsx(
      Oe,
      {
        contentName: D,
        titleName: oe,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ n.jsx(qe, { scope: o, cancelRef: d, children: /* @__PURE__ */ n.jsxs(
          We,
          {
            role: "alertdialog",
            ...i,
            ...a,
            ref: c,
            onOpenAutoFocus: v(a.onOpenAutoFocus, (u) => {
              u.preventDefault(), d.current?.focus({ preventScroll: !0 });
            }),
            onPointerDownOutside: (u) => u.preventDefault(),
            onInteractOutside: (u) => u.preventDefault(),
            children: [
              /* @__PURE__ */ n.jsx(Ke, { children: r }),
              /* @__PURE__ */ n.jsx(Je, { contentRef: l })
            ]
          }
        ) })
      }
    );
  }
);
te.displayName = D;
var oe = "AlertDialogTitle", re = s.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...r } = e, a = f(o);
    return /* @__PURE__ */ n.jsx(ze, { ...a, ...r, ref: t });
  }
);
re.displayName = oe;
var ae = "AlertDialogDescription", ne = s.forwardRef((e, t) => {
  const { __scopeAlertDialog: o, ...r } = e, a = f(o);
  return /* @__PURE__ */ n.jsx(Le, { ...a, ...r, ref: t });
});
ne.displayName = ae;
var Ue = "AlertDialogAction", ie = s.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...r } = e, a = f(o);
    return /* @__PURE__ */ n.jsx(K, { ...a, ...r, ref: t });
  }
);
ie.displayName = Ue;
var se = "AlertDialogCancel", le = s.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...r } = e, { cancelRef: a } = Ze(se, o), i = f(o), l = A(t, a);
    return /* @__PURE__ */ n.jsx(K, { ...i, ...r, ref: l });
  }
);
le.displayName = se;
var Je = ({ contentRef: e }) => {
  const t = `\`${D}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${D}\` by passing a \`${ae}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${D}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  return s.useEffect(() => {
    document.getElementById(
      e.current?.getAttribute("aria-describedby")
    ) || console.warn(t);
  }, [t, e]), null;
}, Qe = J, Xe = Q, et = X, tt = ee, ot = te, rt = ie, at = le, nt = re, it = ne;
function Dt({
  ...e
}) {
  return /* @__PURE__ */ n.jsx(Qe, { "data-slot": "alert-dialog", ...e });
}
function xt({
  ...e
}) {
  return /* @__PURE__ */ n.jsx(Xe, { "data-slot": "alert-dialog-trigger", ...e });
}
function st({
  ...e
}) {
  return /* @__PURE__ */ n.jsx(et, { "data-slot": "alert-dialog-portal", ...e });
}
function lt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n.jsx(
    tt,
    {
      "data-slot": "alert-dialog-overlay",
      className: p(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        e
      ),
      ...t
    }
  );
}
function At({
  className: e,
  size: t = "default",
  ...o
}) {
  return /* @__PURE__ */ n.jsxs(st, { children: [
    /* @__PURE__ */ n.jsx(lt, {}),
    /* @__PURE__ */ n.jsx(
      ot,
      {
        "data-slot": "alert-dialog-content",
        "data-size": t,
        className: p(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg",
          e
        ),
        ...o
      }
    )
  ] });
}
function yt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: p(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        e
      ),
      ...t
    }
  );
}
function ht({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: p(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        e
      ),
      ...t
    }
  );
}
function Ct({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n.jsx(
    nt,
    {
      "data-slot": "alert-dialog-title",
      className: p(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        e
      ),
      ...t
    }
  );
}
function _t({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n.jsx(
    it,
    {
      "data-slot": "alert-dialog-description",
      className: p("text-muted-foreground text-sm", e),
      ...t
    }
  );
}
function Nt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ n.jsx(
    "div",
    {
      "data-slot": "alert-dialog-media",
      className: p(
        "bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        e
      ),
      ...t
    }
  );
}
function Rt({
  className: e,
  variant: t = "default",
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ n.jsx(O, { variant: t, size: o, asChild: !0, children: /* @__PURE__ */ n.jsx(
    rt,
    {
      "data-slot": "alert-dialog-action",
      className: p(e),
      ...r
    }
  ) });
}
function Et({
  className: e,
  variant: t = "outline",
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ n.jsx(O, { variant: t, size: o, asChild: !0, children: /* @__PURE__ */ n.jsx(
    at,
    {
      "data-slot": "alert-dialog-cancel",
      className: p(e),
      ...r
    }
  ) });
}
export {
  Dt as AlertDialog,
  Rt as AlertDialogAction,
  Et as AlertDialogCancel,
  At as AlertDialogContent,
  _t as AlertDialogDescription,
  ht as AlertDialogFooter,
  yt as AlertDialogHeader,
  Nt as AlertDialogMedia,
  lt as AlertDialogOverlay,
  st as AlertDialogPortal,
  Ct as AlertDialogTitle,
  xt as AlertDialogTrigger
};
