import { j as r } from "../../../jsx-runtime.js";
import { useMemo as u } from "react";
import { TabsList as p } from "../../ui/tabs.js";
import { Card as f } from "../../ui/card.js";
import { useCloseGuardContext as h } from "../../close-guard/CloseGuardHooks.js";
import { c as g } from "../../../utils.js";
import b from "./HomeTabContentSection.js";
function w({ tabs: o, activeTabId: t, onTabSelect: i, onTabClose: d }) {
  const m = o.find((e) => e.id === t) ?? null, s = h(), c = m?.keepMounted ?? !0, a = u(() => {
    const e = [
      "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를 — 윤동주",
      "나 보기가 역겨워 가실 때에는 — 김소월",
      "별 하나에 추억과 별 하나에 사랑과 — 윤동주",
      "한 송이의 국화꽃을 피우기 위해 — 서정주",
      "나는 한 줄기 바람이 되어 — 김영랑",
      "꽃이 진다고 그대를 잊은 적 없다 — 이형기",
      "푸른 하늘의 햇빛은 나의 하늘의 빛 — 이육사",
      "사뿐히 즈려밟고 가시옵소서 — 김소월"
    ];
    return `오늘의 한 구절: ${e[Math.floor(Math.random() * e.length)]}`;
  }, []);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex min-h-0 flex-1 flex-col", children: [
    /* @__PURE__ */ r.jsx("div", { className: "border-b border-border bg-background", children: /* @__PURE__ */ r.jsxs("div", { className: "flex flex-wrap items-center gap-3 px-6 py-3", children: [
      /* @__PURE__ */ r.jsx(p, { className: "flex flex-wrap gap-2 bg-transparent p-0", children: o.map((e) => {
        const n = e.id === t, l = s?.isTabDirty(e.id) ?? !1;
        return /* @__PURE__ */ r.jsxs(
          "div",
          {
            className: g(
              "flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition",
              n ? "border-border bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-accent/90 hover:text-accent-foreground",
              l && !n && "border-amber-300 bg-amber-100/70 text-amber-950",
              l && n && "border-amber-400 bg-amber-200/70 text-amber-950"
            ),
            children: [
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  className: "font-semibold",
                  onClick: () => {
                    if (e.id !== t) {
                      if (!s || !t || c) {
                        i(e.id);
                        return;
                      }
                      s.attemptSwitch(t, () => i(e.id));
                    }
                  },
                  children: e.label
                }
              ),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": `${e.label} 탭 닫기`,
                  className: "rounded-full px-1  transition hover:text-foreground",
                  onClick: (x) => {
                    x.stopPropagation(), d(e.id);
                  },
                  children: "×"
                }
              )
            ]
          },
          e.id
        );
      }) }),
      /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        "열린 탭 ",
        o.length,
        "개"
      ] })
    ] }) }),
    /* @__PURE__ */ r.jsx("div", { className: "flex-1 min-h-0 overflow-hidden p-6", children: o.length > 0 ? /* @__PURE__ */ r.jsx("div", { className: "h-full min-h-0", children: o.map((e) => /* @__PURE__ */ r.jsx(
      b,
      {
        tab: e,
        isActive: e.id === t,
        keepMounted: e.keepMounted ?? !0
      },
      e.id
    )) }) : /* @__PURE__ */ r.jsx(f, { className: "flex h-full items-center justify-center border-dashed bg-muted/20 p-10 text-center", children: /* @__PURE__ */ r.jsx("div", { children: /* @__PURE__ */ r.jsx("p", { className: "text-lg font-semibold text-foreground", children: a }) }) }) })
  ] });
}
export {
  w as default
};
