import { j as e } from "../../jsx-runtime.js";
import * as u from "react";
import { ResizableSplitView as v } from "../../components/layout/ResizableSplitView.js";
import { Button as c } from "../../components/ui/button.js";
import { Card as x, CardHeader as m, CardTitle as h, CardDescription as o, CardContent as j } from "../../components/ui/card.js";
import { Input as y } from "../../components/ui/input.js";
import { Label as d } from "../../components/ui/label.js";
import { RadioGroup as T, RadioGroupItem as f } from "../../components/ui/radio-group.js";
import { Select as w, SelectTrigger as k, SelectValue as z, SelectContent as D, SelectItem as p } from "../../components/ui/select.js";
import { Tabs as N, TabsList as g, TabsTrigger as l, TabsContent as a } from "../../components/ui/tabs.js";
import { formStyles as t } from "../../components/ui/form-styles.js";
const b = 320, F = () => /* @__PURE__ */ e.jsxs("div", { className: "space-y-5", children: [
  /* @__PURE__ */ e.jsxs("div", { className: t.field, children: [
    /* @__PURE__ */ e.jsx(d, { htmlFor: "title", children: "텍스트" }),
    /* @__PURE__ */ e.jsx(y, { id: "title", placeholder: "입력 내용을 적어주세요" }),
    /* @__PURE__ */ e.jsx("p", { className: t.helperText, children: "텍스트 스타일은 form-styles.ts에서 일괄 조정할 수 있습니다." })
  ] }),
  /* @__PURE__ */ e.jsxs("div", { className: t.field, children: [
    /* @__PURE__ */ e.jsx(d, { htmlFor: "amount", children: "숫자 입력" }),
    /* @__PURE__ */ e.jsx(y, { id: "amount", type: "number", placeholder: "0", min: 0 })
  ] }),
  /* @__PURE__ */ e.jsxs("div", { className: t.field, children: [
    /* @__PURE__ */ e.jsx(d, { children: "라디오" }),
    /* @__PURE__ */ e.jsxs(T, { name: "options", defaultValue: "option-1", children: [
      /* @__PURE__ */ e.jsxs("label", { className: "flex items-center gap-2 text-sm text-primary ", children: [
        /* @__PURE__ */ e.jsx(f, { value: "option-1" }),
        "옵션 A"
      ] }),
      /* @__PURE__ */ e.jsxs("label", { className: "flex items-center gap-2 text-sm text-primary ", children: [
        /* @__PURE__ */ e.jsx(f, { value: "option-2" }),
        "옵션 B"
      ] })
    ] })
  ] }),
  /* @__PURE__ */ e.jsxs("div", { className: t.field, children: [
    /* @__PURE__ */ e.jsx(d, { htmlFor: "select", children: "드롭다운" }),
    /* @__PURE__ */ e.jsxs(w, { children: [
      /* @__PURE__ */ e.jsx(k, { className: "w-45", children: /* @__PURE__ */ e.jsx(z, { placeholder: "Theme" }) }),
      /* @__PURE__ */ e.jsxs(D, { children: [
        /* @__PURE__ */ e.jsx(p, { value: "light", children: "Light" }),
        /* @__PURE__ */ e.jsx(p, { value: "dark", children: "Dark" }),
        /* @__PURE__ */ e.jsx(p, { value: "system", children: "System" })
      ] })
    ] })
  ] })
] }), S = () => /* @__PURE__ */ e.jsxs("div", { className: "space-y-4", children: [
  /* @__PURE__ */ e.jsxs("div", { className: "rounded-lg border border-dashed border-slate-300 bg-background  bg-slate-50 p-4", children: [
    /* @__PURE__ */ e.jsx("p", { className: "text-sm font-medium text-primary ", children: "미리보기 영역" }),
    /* @__PURE__ */ e.jsx("p", { className: "mt-2 text-sm text-primary ", children: "입력 컴포넌트와 레이아웃 동작을 빠르게 확인할 수 있는 공간입니다." })
  ] }),
  /* @__PURE__ */ e.jsx("div", { className: "grid gap-3", children: [
    "기본 텍스트",
    "상태 태그",
    "알림 카드",
    "요약 박스"
  ].map((s) => /* @__PURE__ */ e.jsx(
    "div",
    {
      className: "rounded-md border border-slate-200 bg-white p-3 text-sm text-primary  shadow-sm",
      children: s
    },
    s
  )) })
] }), _ = () => {
  const [s, C] = u.useState("horizontal"), [n, r] = u.useState(b);
  return /* @__PURE__ */ e.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-semibold text-primary ", children: "페이지 탭 기반 스토리보드" }),
      /* @__PURE__ */ e.jsx("p", { className: "mt-2 text-sm text-primary ", children: "페이지 탭, 내부 탭, 가로/세로 스플릿뷰를 조합한 데모 화면입니다." })
    ] }),
    /* @__PURE__ */ e.jsxs(N, { defaultValue: "workspace", children: [
      /* @__PURE__ */ e.jsxs(g, { children: [
        /* @__PURE__ */ e.jsx(l, { value: "overview", children: "요약" }),
        /* @__PURE__ */ e.jsx(l, { value: "workspace", children: "페이지 컨테이너" }),
        /* @__PURE__ */ e.jsx(l, { value: "analytics", children: "추가 페이지" })
      ] }),
      /* @__PURE__ */ e.jsx(a, { value: "overview", children: /* @__PURE__ */ e.jsxs(x, { children: [
        /* @__PURE__ */ e.jsxs(m, { children: [
          /* @__PURE__ */ e.jsx(h, { children: "개요" }),
          /* @__PURE__ */ e.jsx(o, { children: "상단의 페이지 탭에서 원하는 화면을 선택적으로 열람할 수 있습니다." })
        ] }),
        /* @__PURE__ */ e.jsx(j, { children: /* @__PURE__ */ e.jsxs("div", { className: "grid gap-4 text-sm text-primary ", children: [
          /* @__PURE__ */ e.jsx("p", { children: "• 페이지 탭을 선택하면 해당 페이지 콘텐츠만 노출됩니다." }),
          /* @__PURE__ */ e.jsx("p", { children: "• 각 페이지는 독립된 컨테이너와 내부 탭을 포함할 수 있습니다." })
        ] }) })
      ] }) }),
      /* @__PURE__ */ e.jsx(a, { value: "workspace", children: /* @__PURE__ */ e.jsxs(x, { children: [
        /* @__PURE__ */ e.jsxs(m, { children: [
          /* @__PURE__ */ e.jsx(h, { children: "페이지 컨테이너" }),
          /* @__PURE__ */ e.jsx(o, { children: "내부 탭과 스플릿뷰를 포함한 레이아웃 예시입니다." })
        ] }),
        /* @__PURE__ */ e.jsxs(j, { className: "space-y-6", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ e.jsx(
              c,
              {
                onClick: () => C(
                  (i) => i === "horizontal" ? "vertical" : "horizontal"
                ),
                children: "방향 전환"
              }
            ),
            /* @__PURE__ */ e.jsx(c, { onClick: () => r((i) => Math.max(200, i - 40)), children: "더 좁게" }),
            /* @__PURE__ */ e.jsx(c, { onClick: () => r((i) => i + 40), children: "더 넓게" }),
            /* @__PURE__ */ e.jsx(c, { onClick: () => r(b), children: "리셋" }),
            /* @__PURE__ */ e.jsxs("span", { className: "text-sm text-primary ", children: [
              "현재 크기: ",
              Math.round(n),
              "px"
            ] })
          ] }),
          /* @__PURE__ */ e.jsxs(N, { defaultValue: "inputs", children: [
            /* @__PURE__ */ e.jsxs(g, { children: [
              /* @__PURE__ */ e.jsx(l, { value: "inputs", children: "입력 컴포넌트" }),
              /* @__PURE__ */ e.jsx(l, { value: "details", children: "추가 정보" })
            ] }),
            /* @__PURE__ */ e.jsx(a, { value: "inputs", children: /* @__PURE__ */ e.jsx(
              v,
              {
                direction: s,
                size: n,
                onSizeChange: r,
                primary: /* @__PURE__ */ e.jsx(F, {}),
                secondary: /* @__PURE__ */ e.jsx(S, {})
              }
            ) }),
            /* @__PURE__ */ e.jsx(a, { value: "details", children: /* @__PURE__ */ e.jsx(
              v,
              {
                direction: s,
                size: n,
                onSizeChange: r,
                primary: /* @__PURE__ */ e.jsxs("div", { className: "space-y-3 text-sm text-primary ", children: [
                  /* @__PURE__ */ e.jsx("p", { children: "내부 탭을 전환하면 다른 설명/메타 정보를 표시할 수 있습니다." }),
                  /* @__PURE__ */ e.jsxs("ul", { className: "list-disc space-y-1 pl-5", children: [
                    /* @__PURE__ */ e.jsx("li", { children: "스플릿뷰는 드래그로 크기 조절 가능" }),
                    /* @__PURE__ */ e.jsx("li", { children: "버튼으로도 크기를 제어할 수 있음" }),
                    /* @__PURE__ */ e.jsx("li", { children: "가로/세로 방향 전환 지원" })
                  ] })
                ] }),
                secondary: /* @__PURE__ */ e.jsx(S, {})
              }
            ) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ e.jsx(a, { value: "analytics", children: /* @__PURE__ */ e.jsxs(x, { children: [
        /* @__PURE__ */ e.jsxs(m, { children: [
          /* @__PURE__ */ e.jsx(h, { children: "추가 페이지 탭" }),
          /* @__PURE__ */ e.jsx(o, { children: "탭을 추가하면 필요한 페이지를 선택적으로 노출할 수 있습니다." })
        ] }),
        /* @__PURE__ */ e.jsx(j, { children: /* @__PURE__ */ e.jsxs("div", { className: "grid gap-4 text-sm text-primary ", children: [
          /* @__PURE__ */ e.jsx("p", { children: "• 페이지 탭은 필요에 따라 늘리거나 줄일 수 있습니다." }),
          /* @__PURE__ */ e.jsx("p", { children: "• 각 페이지는 독립적인 내부 탭을 구성할 수 있습니다." })
        ] }) })
      ] }) })
    ] })
  ] });
};
export {
  _ as TabbedStoryboardPage,
  _ as default
};
