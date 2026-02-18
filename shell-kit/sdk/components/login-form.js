import { j as e } from "../jsx-runtime.js";
import { c as u } from "../utils.js";
import { Button as p } from "./ui/button.js";
import { FieldGroup as h, Field as t, FieldLabel as i, FieldDescription as j } from "./ui/field.js";
import { Input as a } from "./ui/input.js";
function N({
  className: d,
  userId: n,
  password: c,
  onUserIdChange: o,
  onPasswordChange: x,
  isPending: s = !1,
  errorMessage: l,
  ...m
}) {
  return /* @__PURE__ */ e.jsx("form", { className: u("flex flex-col gap-6", d), ...m, children: /* @__PURE__ */ e.jsxs(h, { children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col items-center gap-1 text-center", children: [
      /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-bold", children: "AMORE PACIFIC MES" }),
      /* @__PURE__ */ e.jsx("p", { className: "text-muted-foreground text-sm text-balance", children: "Manufacturing Execution System" })
    ] }),
    /* @__PURE__ */ e.jsxs(t, { children: [
      /* @__PURE__ */ e.jsx(i, { htmlFor: "userId", children: "ID" }),
      /* @__PURE__ */ e.jsx(
        a,
        {
          id: "userId",
          type: "text",
          value: n,
          onChange: (r) => o(r.target.value),
          required: !0,
          placeholder: "admin-user"
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs(t, { children: [
      /* @__PURE__ */ e.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ e.jsx(i, { htmlFor: "password", children: "Password" }) }),
      /* @__PURE__ */ e.jsx(
        a,
        {
          id: "password",
          type: "password",
          value: c,
          onChange: (r) => x(r.target.value),
          required: !0,
          placeholder: "아무 값"
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(t, { children: /* @__PURE__ */ e.jsx(p, { type: "submit", disabled: s, children: s ? "로그인 중..." : "로그인" }) }),
    l ? /* @__PURE__ */ e.jsx(j, { className: "text-destructive text-center", children: l }) : null
  ] }) });
}
export {
  N as LoginForm
};
