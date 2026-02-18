import { useState as u, useRef as c, useEffect as l } from "react";
import { refreshSession as p } from "../api/auth/index.js";
import { useAuthStore as m } from "../stores/auth-store.js";
const y = () => {
  const [f, t] = u(!0), { accessToken: r, setAccessToken: o, setUser: n, reset: i } = m(), a = c(!1);
  return l(() => {
    let e = !0;
    return a.current ? (t(!1), () => {
      e = !1;
    }) : (a.current = !0, (async () => {
      if (r) {
        e && t(!1);
        return;
      }
      try {
        if (!e)
          return;
        const s = await p();
        o(s.accessToken), n(s.user, s.roles);
      } catch {
        if (!e)
          return;
        i();
      } finally {
        e && t(!1);
      }
    })(), () => {
      e = !1;
    });
  }, [r, i, o, n]), { isBootstrapping: f };
};
export {
  y as useAuthBootstrap
};
