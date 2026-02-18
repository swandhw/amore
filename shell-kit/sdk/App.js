import { j as t } from "./jsx-runtime.js";
import { useMutation as p } from "@tanstack/react-query";
import { useNavigate as u } from "react-router-dom";
import s from "./AppShell.js";
import { logout as a } from "./api/auth/index.js";
import f from "./routes/AppRouter.js";
import { useAuthStore as l } from "./stores/auth-store.js";
import c from "./AppHeader.js";
function M() {
  const { isAuthenticated: o, user: e, reset: r } = l(), i = u(), m = p({
    mutationFn: a,
    onSettled: () => {
      r(), i("/login", { replace: !0 });
    }
  }), n = () => {
    m.mutate();
  };
  return /* @__PURE__ */ t.jsx(
    s,
    {
      header: /* @__PURE__ */ t.jsx(c, { isAuthenticated: o, user: e, handleLogoutClick: n }),
      content: /* @__PURE__ */ t.jsx(f, {})
    }
  );
}
export {
  M as default
};
