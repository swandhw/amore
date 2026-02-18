import * as n from "react";
import { j as p } from "./jsx-runtime.js";
function j(e, o, { checkForDefaultPrevented: t = !0 } = {}) {
  return function(s) {
    if (e?.(s), t === !1 || !s.defaultPrevented)
      return o?.(s);
  };
}
function I(e, o) {
  const t = n.createContext(o), i = (u) => {
    const { children: c, ...r } = u, a = n.useMemo(() => r, Object.values(r));
    return /* @__PURE__ */ p.jsx(t.Provider, { value: a, children: c });
  };
  i.displayName = e + "Provider";
  function s(u) {
    const c = n.useContext(t);
    if (c) return c;
    if (o !== void 0) return o;
    throw new Error(`\`${u}\` must be used within \`${e}\``);
  }
  return [i, s];
}
function _(e, o = []) {
  let t = [];
  function i(u, c) {
    const r = n.createContext(c), a = t.length;
    t = [...t, c];
    const d = (f) => {
      const { scope: m, children: x, ...v } = f, S = m?.[e]?.[a] || r, h = n.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ p.jsx(S.Provider, { value: h, children: x });
    };
    d.displayName = u + "Provider";
    function l(f, m) {
      const x = m?.[e]?.[a] || r, v = n.useContext(x);
      if (v) return v;
      if (c !== void 0) return c;
      throw new Error(`\`${f}\` must be used within \`${u}\``);
    }
    return [d, l];
  }
  const s = () => {
    const u = t.map((c) => n.createContext(c));
    return function(r) {
      const a = r?.[e] || u;
      return n.useMemo(
        () => ({ [`__scope${e}`]: { ...r, [e]: a } }),
        [r, a]
      );
    };
  };
  return s.scopeName = e, [i, E(s, ...o)];
}
function E(...e) {
  const o = e[0];
  if (e.length === 1) return o;
  const t = () => {
    const i = e.map((s) => ({
      useScope: s(),
      scopeName: s.scopeName
    }));
    return function(u) {
      const c = i.reduce((r, { useScope: a, scopeName: d }) => {
        const f = a(u)[`__scope${d}`];
        return { ...r, ...f };
      }, {});
      return n.useMemo(() => ({ [`__scope${o.scopeName}`]: c }), [c]);
    };
  };
  return t.scopeName = o.scopeName, t;
}
var C = globalThis?.document ? n.useLayoutEffect : () => {
}, P = n[" useId ".trim().toString()] || (() => {
}), $ = 0;
function y(e) {
  const [o, t] = n.useState(P());
  return C(() => {
    t((i) => i ?? String($++));
  }, [e]), o ? `radix-${o}` : "";
}
var b = n[" useInsertionEffect ".trim().toString()] || C;
function M({
  prop: e,
  defaultProp: o,
  onChange: t = () => {
  },
  caller: i
}) {
  const [s, u, c] = w({
    defaultProp: o,
    onChange: t
  }), r = e !== void 0, a = r ? e : s;
  {
    const l = n.useRef(e !== void 0);
    n.useEffect(() => {
      const f = l.current;
      f !== r && console.warn(
        `${i} is changing from ${f ? "controlled" : "uncontrolled"} to ${r ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), l.current = r;
    }, [r, i]);
  }
  const d = n.useCallback(
    (l) => {
      if (r) {
        const f = R(l) ? l(e) : l;
        f !== e && c.current?.(f);
      } else
        u(l);
    },
    [r, e, u, c]
  );
  return [a, d];
}
function w({
  defaultProp: e,
  onChange: o
}) {
  const [t, i] = n.useState(e), s = n.useRef(t), u = n.useRef(o);
  return b(() => {
    u.current = o;
  }, [o]), n.useEffect(() => {
    s.current !== t && (u.current?.(t), s.current = t);
  }, [t, s]), [t, i, u];
}
function R(e) {
  return typeof e == "function";
}
export {
  I as a,
  M as b,
  _ as c,
  y as d,
  j as e,
  C as u
};
