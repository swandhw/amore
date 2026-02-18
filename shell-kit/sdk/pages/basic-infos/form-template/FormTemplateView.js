import { j as e } from "../../../jsx-runtime.js";
import { Card as t } from "../../../components/ui/card.js";
import d from "../../../components/form-template/FormTemplateSection.js";
import { ViewFill as s } from "../../../components/layout/ViewFill.js";
function i({ rows: r }) {
  return /* @__PURE__ */ e.jsxs(s, { variant: "root", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "flex flex-col gap-6 p-8 pb-0", children: [
      /* @__PURE__ */ e.jsxs("header", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-semibold text-primary", children: "기본정보 폼 템플릿" }),
        /* @__PURE__ */ e.jsx("p", { className: "mt-2 text-sm text-foreground", children: "줄 단위로 구성된 입력 폼 템플릿을 정의하고, 각 필드의 너비와 변경 여부를 확인합니다." })
      ] }),
      /* @__PURE__ */ e.jsx(t, { className: "border background-primary p-5 shadow-sm", children: /* @__PURE__ */ e.jsxs("dl", { className: "grid gap-4 text-sm text-foreground md:grid-cols-3", children: [
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("dt", { className: "text-xs font-semibold text-muted-foreground", children: "템플릿 규칙" }),
          /* @__PURE__ */ e.jsx("dd", { className: "mt-1", children: "숫자는 비율, *는 남은 공간을 차지합니다." })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("dt", { className: "text-xs font-semibold text-muted-foreground", children: "폼 타입" }),
          /* @__PURE__ */ e.jsx("dd", { className: "mt-1", children: "text / date / number 입력을 지원합니다." })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("dt", { className: "text-xs font-semibold text-muted-foreground", children: "변경 감지" }),
          /* @__PURE__ */ e.jsx("dd", { className: "mt-1", children: "초기값과 현재값을 비교하여 표시합니다." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ e.jsx(s, { className: "p-8 pt-6 overflow-y-scroll", children: /* @__PURE__ */ e.jsx(d, { rows: r }) })
  ] });
}
export {
  i as default
};
