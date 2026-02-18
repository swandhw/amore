import { j as o } from "../../jsx-runtime.js";
import { Loader2Icon as b, OctagonXIcon as j, TriangleAlertIcon as I, InfoIcon as S, CircleCheckIcon as T } from "lucide-react";
import * as m from "react";
import { T as N } from "../../index.js";
var w = (r, a, d, n, c, t, u, p) => {
  let s = document.documentElement, f = ["light", "dark"];
  function i(e) {
    (Array.isArray(r) ? r : [r]).forEach((l) => {
      let h = l === "class", v = h && t ? c.map((g) => t[g] || g) : c;
      h ? (s.classList.remove(...v), s.classList.add(t && t[e] ? t[e] : e)) : s.setAttribute(l, e);
    }), x(e);
  }
  function x(e) {
    p && f.includes(e) && (s.style.colorScheme = e);
  }
  function y() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (n) i(n);
  else try {
    let e = localStorage.getItem(a) || d, l = u && e === "system" ? y() : e;
    i(l);
  } catch {
  }
}, z = m.createContext(void 0), k = { setTheme: (r) => {
}, themes: [] }, C = () => {
  var r;
  return (r = m.useContext(z)) != null ? r : k;
};
m.memo(({ forcedTheme: r, storageKey: a, attribute: d, enableSystem: n, enableColorScheme: c, defaultTheme: t, value: u, themes: p, nonce: s, scriptProps: f }) => {
  let i = JSON.stringify([d, a, t, r, p, u, n, c]).slice(1, -1);
  return m.createElement("script", { ...f, suppressHydrationWarning: !0, nonce: typeof window > "u" ? s : "", dangerouslySetInnerHTML: { __html: `(${w.toString()})(${i})` } });
});
const M = ({ ...r }) => {
  const { theme: a = "system" } = C();
  return /* @__PURE__ */ o.jsx(
    N,
    {
      theme: a,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ o.jsx(T, { className: "size-4" }),
        info: /* @__PURE__ */ o.jsx(S, { className: "size-4" }),
        warning: /* @__PURE__ */ o.jsx(I, { className: "size-4" }),
        error: /* @__PURE__ */ o.jsx(j, { className: "size-4" }),
        loading: /* @__PURE__ */ o.jsx(b, { className: "size-4 animate-spin" })
      },
      position: "top-center",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      ...r
    }
  );
};
export {
  M as Toaster
};
