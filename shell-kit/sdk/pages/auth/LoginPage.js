import { j as s } from "../../jsx-runtime.js";
import { useMutation as p } from "@tanstack/react-query";
import { useState as a, useMemo as x } from "react";
import { useNavigate as E, useLocation as f, useSearchParams as R } from "react-router-dom";
import { login as j } from "../../api/auth/index.js";
import { useAuthStore as L } from "../../stores/auth-store.js";
import { LoginForm as S } from "../../components/login-form.js";
function _() {
  const c = E(), t = f(), [o] = R(), { setAccessToken: m, setUser: u } = L(), [n, d] = a(""), [i, l] = a(""), h = x(() => {
    const e = o.get("redirect");
    return e || t.state?.from?.pathname || "/";
  }, [t.state, o]), r = p({
    mutationFn: j,
    onSuccess: (e) => {
      m(e.accessToken), u(e.user, e.roles), c(h, { replace: !0 });
    }
  }), g = (e) => {
    e.preventDefault(), r.mutate({ userId: n, password: i });
  };
  return /* @__PURE__ */ s.jsxs("div", { style: { padding: "2rem", maxWidth: 480, margin: "0 auto" }, children: [
    /* @__PURE__ */ s.jsx(
      S,
      {
        onSubmit: g,
        userId: n,
        password: i,
        onUserIdChange: d,
        onPasswordChange: l,
        isPending: r.isPending,
        errorMessage: r.isError ? "로그인 실패: 사용자 ID를 확인해주세요." : void 0
      }
    ),
    /* @__PURE__ */ s.jsxs("div", { className: "text-sm", children: [
      /* @__PURE__ */ s.jsx("p", { children: "아무 비밀번호로 로그인 가능합니다. 사용자 ID로 권한이 구분됩니다." }),
      /* @__PURE__ */ s.jsxs("ul", { children: [
        /* @__PURE__ */ s.jsx("li", { children: "admin-user (ROLE_ADMIN + ROLE_MANAGER + ROLE_USER)" }),
        /* @__PURE__ */ s.jsx("li", { children: "manager-user (ROLE_MANAGER + ROLE_USER)" }),
        /* @__PURE__ */ s.jsx("li", { children: "standard-user (ROLE_USER)" })
      ] })
    ] })
  ] });
}
export {
  _ as default
};
