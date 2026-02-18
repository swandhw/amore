import u from "react";
const l = (t) => {
  let e;
  const n = /* @__PURE__ */ new Set(), c = (s, r) => {
    const o = typeof s == "function" ? s(e) : s;
    if (!Object.is(o, e)) {
      const d = e;
      e = r ?? (typeof o != "object" || o === null) ? o : Object.assign({}, e, o), n.forEach((g) => g(e, d));
    }
  }, i = () => e, a = { setState: c, getState: i, getInitialState: () => f, subscribe: (s) => (n.add(s), () => n.delete(s)) }, f = e = t(c, i, a);
  return a;
}, I = ((t) => t ? l(t) : l), h = (t) => t;
function j(t, e = h) {
  const n = u.useSyncExternalStore(
    t.subscribe,
    u.useCallback(() => e(t.getState()), [t, e]),
    u.useCallback(() => e(t.getInitialState()), [t, e])
  );
  return u.useDebugValue(n), n;
}
const S = (t) => {
  const e = I(t), n = (c) => j(e, c);
  return Object.assign(n, e), n;
}, m = ((t) => t ? S(t) : S), b = {
  accessToken: null,
  roles: [],
  user: null,
  isAuthenticated: !1
}, x = m((t) => ({
  ...b,
  setAccessToken: (e) => t(() => ({
    accessToken: e,
    isAuthenticated: !!e
  })),
  setUser: (e, n) => t(() => ({ user: e, roles: n })),
  reset: () => t(() => ({ ...b }))
}));
export {
  x as useAuthStore
};
