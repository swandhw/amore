import { j as e } from "../../jsx-runtime.js";
import { useMemo as d, useState as p } from "react";
import { Input as h } from "../ui/input.js";
const o = (a) => {
  const l = a.flatMap(
    (n) => n.fields.map((i) => [i.key, i.initialValue])
  );
  return Object.fromEntries(l);
}, f = (a) => a === "*" ? 1 : a;
function y({ rows: a }) {
  const l = d(() => o(a), [a]), [n, i] = p(() => o(a)), m = d(() => Object.entries(n).filter(([t, s]) => s !== l[t]).map(([t]) => t), [l, n]), x = (t, s) => {
    i((r) => ({
      ...r,
      [t]: s
    }));
  };
  return /* @__PURE__ */ e.jsxs("section", { className: "rounded-lg border bg-background p-6 shadow-sm", children: [
    /* @__PURE__ */ e.jsxs("header", { className: "flex flex-wrap items-center justify-between gap-3 border-b bg-background pb-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h2", { className: "text-lg font-semibold text-primary", children: "폼 템플릿 프리뷰" }),
        /* @__PURE__ */ e.jsx("p", { className: "text-sm text-muted-foreground", children: "줄 단위로 필드를 정의하고, 숫자나 *로 너비 비율을 지정합니다." })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground", children: [
        "변경된 필드 ",
        m.length,
        "개"
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "mt-6 space-y-5", children: a.map((t) => /* @__PURE__ */ e.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ e.jsx("h3", { className: "text-sm font-semibold text-muted-foreground", children: t.title }),
        /* @__PURE__ */ e.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Layout: ",
          t.fields.map((s) => s.size).join(" / ")
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "flex flex-wrap gap-4", children: t.fields.map((s) => {
        const r = n[s.key] !== l[s.key], c = `${t.id}-${s.key}`;
        return /* @__PURE__ */ e.jsxs(
          "div",
          {
            className: "min-w-45",
            style: {
              flexGrow: f(s.size),
              flexBasis: 0
            },
            children: [
              /* @__PURE__ */ e.jsx("label", { htmlFor: c, className: "text-xs font-semibold text-muted-foreground", children: s.label }),
              /* @__PURE__ */ e.jsx(
                h,
                {
                  id: c,
                  type: s.type,
                  value: n[s.key],
                  placeholder: s.placeholder,
                  onChange: (u) => x(s.key, u.target.value),
                  className: r ? "border-ring focus-visible:border-accent focus-visible:ring" : ""
                }
              ),
              /* @__PURE__ */ e.jsxs("div", { className: "mt-1 flex items-center justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ e.jsxs("span", { children: [
                  "초기값: ",
                  s.initialValue || "없음"
                ] }),
                /* @__PURE__ */ e.jsx("span", { className: r ? "font-semibold text-accent" : "", children: r ? "변경됨" : "기본값" })
              ] })
            ]
          },
          s.key
        );
      }) })
    ] }, t.id)) })
  ] });
}
export {
  y as default
};
