import { j as e } from "../../../jsx-runtime.js";
import { Card as a } from "../../../components/ui/card.js";
function d({
  screenName: t,
  serverTime: r,
  isLoading: s
}) {
  return /* @__PURE__ */ e.jsxs("div", { className: "flex min-h-screen flex-col gap-6 bg-background  bg-slate-50 p-8", children: [
    /* @__PURE__ */ e.jsxs("header", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-semibold text-primary ", children: "패키징정보 개요" }),
      /* @__PURE__ */ e.jsx("p", { className: "mt-2 text-sm text-primary ", children: "선택한 업무 도메인의 샘플 화면입니다." })
    ] }),
    /* @__PURE__ */ e.jsx(a, { className: "max-w-xl border border-slate-200 bg-white p-6 shadow-sm", children: /* @__PURE__ */ e.jsxs("dl", { className: "space-y-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "text-xs font-semibold uppercase text-primary ", children: "현재 화면명" }),
        /* @__PURE__ */ e.jsx("dd", { className: "mt-1 text-lg font-semibold text-primary ", children: s ? "불러오는 중..." : t })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "text-xs font-semibold uppercase text-primary ", children: "서버 시간" }),
        /* @__PURE__ */ e.jsx("dd", { className: "mt-1 text-sm text-primary ", children: s ? "불러오는 중..." : r })
      ] })
    ] }) })
  ] });
}
export {
  d as default
};
