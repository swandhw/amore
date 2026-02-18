import { j as v } from "../../jsx-runtime.js";
import * as p from "react";
import a from "react";
import { S as ee } from "../../index2.js";
import { c as R } from "../../utils.js";
import { Label as te } from "./label.js";
var re = (e) => e.type === "checkbox", S = (e) => e instanceof Date, L = (e) => e == null;
const q = (e) => typeof e == "object";
var I = (e) => !L(e) && !Array.isArray(e) && q(e) && !S(e), se = (e) => I(e) && e.target ? re(e.target) ? e.target.checked : e.target.value : e, oe = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, ne = (e, o) => e.has(oe(o)), ae = (e) => {
  const o = e.constructor && e.constructor.prototype;
  return I(o) && o.hasOwnProperty("isPrototypeOf");
}, ue = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function K(e) {
  if (e instanceof Date)
    return new Date(e);
  const o = typeof FileList < "u" && e instanceof FileList;
  if (ue && (e instanceof Blob || o))
    return e;
  const t = Array.isArray(e);
  if (!t && !(I(e) && ae(e)))
    return e;
  const s = t ? [] : Object.create(Object.getPrototypeOf(e));
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (s[r] = K(e[r]));
  return s;
}
var z = (e) => /^\w*$/.test(e), D = (e) => e === void 0, ie = (e) => Array.isArray(e) ? e.filter(Boolean) : [], J = (e) => ie(e.replace(/["|']|\]/g, "").split(/\.|\[/)), y = (e, o, t) => {
  if (!o || !I(e))
    return t;
  const s = (z(o) ? [o] : J(o)).reduce((r, n) => L(r) ? r : r[n], e);
  return D(s) || s === e ? D(e[o]) ? t : e[o] : s;
}, M = (e) => typeof e == "boolean", O = (e) => typeof e == "function", $ = (e, o, t) => {
  let s = -1;
  const r = z(o) ? [o] : J(o), n = r.length, u = n - 1;
  for (; ++s < n; ) {
    const l = r[s];
    let c = t;
    if (s !== u) {
      const f = e[l];
      c = I(f) || Array.isArray(f) ? f : isNaN(+r[s + 1]) ? {} : [];
    }
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return;
    e[l] = c, e = e[l];
  }
};
const H = {
  BLUR: "blur",
  CHANGE: "change"
}, j = {
  all: "all"
}, B = a.createContext(null);
B.displayName = "HookFormControlContext";
const T = () => a.useContext(B);
var le = (e, o, t, s = !0) => {
  const r = {
    defaultValues: o._defaultValues
  };
  for (const n in e)
    Object.defineProperty(r, n, {
      get: () => {
        const u = n;
        return o._proxyFormState[u] !== j.all && (o._proxyFormState[u] = !s || j.all), t && (t[u] = !0), e[u];
      }
    });
  return r;
};
const Q = typeof window < "u" ? a.useLayoutEffect : a.useEffect;
function ce(e) {
  const o = T(), { control: t = o, disabled: s, name: r, exact: n } = e || {}, [u, l] = a.useState(t._formState), c = a.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return Q(() => t._subscribe({
    name: r,
    formState: c.current,
    exact: n,
    callback: (f) => {
      !s && l({
        ...t._formState,
        ...f
      });
    }
  }), [r, s, n]), a.useEffect(() => {
    c.current.isValid && t._setValid(!0);
  }, [t]), a.useMemo(() => le(u, t, c.current, !1), [u, t]);
}
var fe = (e) => typeof e == "string", W = (e, o, t, s, r) => fe(e) ? y(t, e, r) : Array.isArray(e) ? e.map((n) => y(t, n)) : t, G = (e) => L(e) || !q(e);
function E(e, o, t = /* @__PURE__ */ new WeakSet()) {
  if (G(e) || G(o))
    return Object.is(e, o);
  if (S(e) && S(o))
    return Object.is(e.getTime(), o.getTime());
  const s = Object.keys(e), r = Object.keys(o);
  if (s.length !== r.length)
    return !1;
  if (t.has(e) || t.has(o))
    return !0;
  t.add(e), t.add(o);
  for (const n of s) {
    const u = e[n];
    if (!r.includes(n))
      return !1;
    if (n !== "ref") {
      const l = o[n];
      if (S(u) && S(l) || I(u) && I(l) || Array.isArray(u) && Array.isArray(l) ? !E(u, l, t) : !Object.is(u, l))
        return !1;
    }
  }
  return !0;
}
function de(e) {
  const o = T(), { control: t = o, name: s, defaultValue: r, disabled: n, exact: u, compute: l } = e || {}, c = a.useRef(r), f = a.useRef(l), F = a.useRef(void 0), d = a.useRef(t), g = a.useRef(s);
  f.current = l;
  const [h, _] = a.useState(() => {
    const i = t._getWatch(s, c.current);
    return f.current ? f.current(i) : i;
  }), b = a.useCallback((i) => {
    const m = W(s, t._names, i || t._formValues, !1, c.current);
    return f.current ? f.current(m) : m;
  }, [t._formValues, t._names, s]), C = a.useCallback((i) => {
    if (!n) {
      const m = W(s, t._names, i || t._formValues, !1, c.current);
      if (f.current) {
        const V = f.current(m);
        E(V, F.current) || (_(V), F.current = V);
      } else
        _(m);
    }
  }, [t._formValues, t._names, n, s]);
  Q(() => ((d.current !== t || !E(g.current, s)) && (d.current = t, g.current = s, C()), t._subscribe({
    name: s,
    formState: {
      values: !0
    },
    exact: u,
    callback: (i) => {
      C(i.values);
    }
  })), [t, u, s, C]), a.useEffect(() => t._removeUnmounted());
  const x = d.current !== t, w = g.current, N = a.useMemo(() => {
    if (n)
      return null;
    const i = !x && !E(w, s);
    return x || i ? b() : null;
  }, [n, x, s, w, b]);
  return N !== null ? N : h;
}
function me(e) {
  const o = T(), { name: t, disabled: s, control: r = o, shouldUnregister: n, defaultValue: u, exact: l = !0 } = e, c = ne(r._names.array, t), f = a.useMemo(() => y(r._formValues, t, y(r._defaultValues, t, u)), [r, t, u]), F = de({
    control: r,
    name: t,
    defaultValue: f,
    exact: l
  }), d = ce({
    control: r,
    name: t,
    exact: l
  }), g = a.useRef(e), h = a.useRef(void 0), _ = a.useRef(r.register(t, {
    ...e.rules,
    value: F,
    ...M(e.disabled) ? { disabled: e.disabled } : {}
  }));
  g.current = e;
  const b = a.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!y(d.errors, t)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!y(d.dirtyFields, t)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!y(d.touchedFields, t)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!y(d.validatingFields, t)
    },
    error: {
      enumerable: !0,
      get: () => y(d.errors, t)
    }
  }), [d, t]), C = a.useCallback((i) => _.current.onChange({
    target: {
      value: se(i),
      name: t
    },
    type: H.CHANGE
  }), [t]), x = a.useCallback(() => _.current.onBlur({
    target: {
      value: y(r._formValues, t),
      name: t
    },
    type: H.BLUR
  }), [t, r._formValues]), w = a.useCallback((i) => {
    const m = y(r._fields, t);
    m && m._f && i && (m._f.ref = {
      focus: () => O(i.focus) && i.focus(),
      select: () => O(i.select) && i.select(),
      setCustomValidity: (V) => O(i.setCustomValidity) && i.setCustomValidity(V),
      reportValidity: () => O(i.reportValidity) && i.reportValidity()
    });
  }, [r._fields, t]), N = a.useMemo(() => ({
    name: t,
    value: F,
    ...M(s) || d.disabled ? { disabled: d.disabled || s } : {},
    onChange: C,
    onBlur: x,
    ref: w
  }), [t, s, d.disabled, C, x, w, F]);
  return a.useEffect(() => {
    const i = r._options.shouldUnregister || n, m = h.current;
    m && m !== t && !c && r.unregister(m), r.register(t, {
      ...g.current.rules,
      ...M(g.current.disabled) ? { disabled: g.current.disabled } : {}
    });
    const V = (k, Z) => {
      const P = y(r._fields, k);
      P && P._f && (P._f.mount = Z);
    };
    if (V(t, !0), i) {
      const k = K(y(r._options.defaultValues, t, g.current.defaultValue));
      $(r._defaultValues, t, k), D(y(r._formValues, t)) && $(r._formValues, t, k);
    }
    return !c && r.register(t), h.current = t, () => {
      (c ? i && !r._state.action : i) ? r.unregister(t) : V(t, !1);
    };
  }, [t, r, c, n]), a.useEffect(() => {
    r._setDisabledField({
      disabled: s,
      name: t
    });
  }, [s, t, r]), a.useMemo(() => ({
    field: N,
    formState: d,
    fieldState: b
  }), [N, d, b]);
}
const ye = (e) => e.render(me(e)), U = a.createContext(null);
U.displayName = "HookFormContext";
const ge = () => a.useContext(U), pe = (e) => {
  const { children: o, watch: t, getValues: s, getFieldState: r, setError: n, clearErrors: u, setValue: l, trigger: c, formState: f, resetField: F, reset: d, handleSubmit: g, unregister: h, control: _, register: b, setFocus: C, subscribe: x } = e;
  return a.createElement(
    U.Provider,
    { value: a.useMemo(() => ({
      watch: t,
      getValues: s,
      getFieldState: r,
      setError: n,
      clearErrors: u,
      setValue: l,
      trigger: c,
      formState: f,
      resetField: F,
      reset: d,
      handleSubmit: g,
      unregister: h,
      control: _,
      register: b,
      setFocus: C,
      subscribe: x
    }), [
      u,
      _,
      f,
      r,
      s,
      g,
      b,
      d,
      F,
      n,
      C,
      l,
      x,
      c,
      h,
      t
    ]) },
    a.createElement(B.Provider, { value: _ }, o)
  );
}, Ne = pe, X = p.createContext(null), Se = ({
  ...e
}) => /* @__PURE__ */ v.jsx(X.Provider, { value: { name: e.name }, children: /* @__PURE__ */ v.jsx(ye, { ...e }) }), A = () => {
  const e = p.useContext(X), o = p.useContext(Y), { getFieldState: t, formState: s } = ge();
  if (!e)
    throw new Error("useFormField should be used within <FormField>");
  if (!o)
    throw new Error("useFormField should be used within <FormItem>");
  const r = t(e.name, s), { id: n } = o;
  return {
    id: n,
    name: e.name,
    formItemId: `${n}-form-item`,
    formDescriptionId: `${n}-form-item-description`,
    formMessageId: `${n}-form-item-message`,
    ...r
  };
}, Y = p.createContext(null), Fe = p.forwardRef(({ className: e, ...o }, t) => {
  const s = p.useId();
  return /* @__PURE__ */ v.jsx(Y.Provider, { value: { id: s }, children: /* @__PURE__ */ v.jsx("div", { ref: t, className: R("space-y-2", e), ...o }) });
});
Fe.displayName = "FormItem";
const _e = p.forwardRef(({ className: e, ...o }, t) => {
  const { error: s, formItemId: r } = A();
  return /* @__PURE__ */ v.jsx(
    te,
    {
      ref: t,
      className: R(s && "text-destructive", e),
      htmlFor: r,
      ...o
    }
  );
});
_e.displayName = "FormLabel";
const Ce = p.forwardRef(({ ...e }, o) => {
  const { error: t, formItemId: s, formDescriptionId: r, formMessageId: n } = A();
  return /* @__PURE__ */ v.jsx(
    ee,
    {
      ref: o,
      id: s,
      "aria-describedby": t ? `${r} ${n}` : `${r}`,
      "aria-invalid": !!t,
      ...e
    }
  );
});
Ce.displayName = "FormControl";
const xe = p.forwardRef(({ className: e, ...o }, t) => {
  const { formDescriptionId: s } = A();
  return /* @__PURE__ */ v.jsx(
    "p",
    {
      ref: t,
      id: s,
      className: R("text-[0.8rem] text-muted-foreground", e),
      ...o
    }
  );
});
xe.displayName = "FormDescription";
const be = p.forwardRef(({ className: e, children: o, ...t }, s) => {
  const { error: r, formMessageId: n } = A(), u = r ? String(r?.message ?? "") : o;
  return u ? /* @__PURE__ */ v.jsx(
    "p",
    {
      ref: s,
      id: n,
      className: R("text-[0.8rem] font-medium text-destructive", e),
      ...t,
      children: u
    }
  ) : null;
});
be.displayName = "FormMessage";
export {
  Ne as Form,
  Ce as FormControl,
  xe as FormDescription,
  Se as FormField,
  Fe as FormItem,
  _e as FormLabel,
  be as FormMessage,
  A as useFormField
};
