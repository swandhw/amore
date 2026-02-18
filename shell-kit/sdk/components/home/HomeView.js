import { j as e } from "../../jsx-runtime.js";
import { useState as i, useMemo as j } from "react";
import { Button as u } from "../ui/button.js";
import E from "./components/HomeDomainMenuSection.js";
import R from "./components/HomeMenuSection.js";
import $ from "./components/HomeTabsSection.js";
import { isHomeTabMenuTab as G } from "./types/HomeTypes.js";
import { Tabs as U, TabsList as V, TabsTrigger as I } from "../ui/tabs.js";
import { useCloseGuardContext as B } from "../close-guard/CloseGuardHooks.js";
import { t as K } from "../../index.js";
function te({ user: x, roles: v, domains: s, isLoading: w }) {
  const [c, k] = i(null), [l, g] = i([]), [r, f] = i(null), [N, y] = i(!0), [T, M] = i(!0), [h, C] = i("menu"), d = B(), D = j(() => l.find((n) => n.id === r) ?? null, [l, r])?.keepMounted ?? !0, b = j(() => c && s.some((n) => n.id === c) ? c : s[0]?.id ?? null, [c, s]), S = j(() => h === "mymenu" ? s.flatMap((n) => n.menus.at(0) ?? []).reverse() : s.find((n) => n.id === b)?.menus ?? [], [s, b, h]), H = (n) => {
    k(n);
  }, A = (n) => {
    if (l.findIndex((t) => t.id === n.id) === -1 && l.length >= 10) {
      K.info("탭은 최대 10개 까지 열 수 있습니다.");
      return;
    }
    const o = () => {
      g((t) => t.some((m) => m.id === n.id) ? t : [...t, { ...n }]), f(n.id);
    };
    if (!d || !r || r === n.id || D) {
      o();
      return;
    }
    d.attemptSwitch(r, o);
  }, L = (n) => {
    f(n);
  }, O = (n) => {
    const p = () => {
      g((o) => {
        const t = o.filter((a) => a.id !== n);
        return f((a) => {
          if (a !== n)
            return a;
          const m = o.findIndex((z) => z.id === n);
          return (t[m] ?? t[m - 1] ?? null)?.id ?? null;
        }), t;
      });
    };
    if (!d) {
      p();
      return;
    }
    d.attemptClose(n, p);
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "flex h-full min-h-0 overflow-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ e.jsx(
      "aside",
      {
        className: `relative h-full min-h-0 border-r border-b border-border bg-background transition-all duration-300 ${N ? "w-72" : "w-12"}`,
        children: N ? /* @__PURE__ */ e.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
            /* @__PURE__ */ e.jsx(
              U,
              {
                value: h,
                className: "w-full",
                onValueChange: (n) => {
                  G(n) && C(n);
                },
                children: /* @__PURE__ */ e.jsxs(V, { children: [
                  /* @__PURE__ */ e.jsx(I, { value: "menu", children: "MENU" }),
                  /* @__PURE__ */ e.jsx(I, { value: "mymenu", children: "MY MENU" })
                ] })
              }
            ),
            /* @__PURE__ */ e.jsx(
              u,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => y(!1),
                children: "접기"
              }
            )
          ] }),
          /* @__PURE__ */ e.jsx(
            R,
            {
              menus: S,
              activeMenuId: r,
              isLoading: w,
              onMenuSelect: A
            }
          )
        ] }) : /* @__PURE__ */ e.jsx("div", { className: "flex h-full min-h-0 items-center justify-center", children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "button",
            size: "icon",
            variant: "secondary",
            className: "h-10 w-10 rounded-full",
            "aria-label": "메뉴 열기",
            onClick: () => y(!0),
            children: "›"
          }
        ) })
      }
    ),
    /* @__PURE__ */ e.jsxs("section", { className: "flex min-w-0 flex-1 min-h-0 flex-col", children: [
      /* @__PURE__ */ e.jsx("header", { className: "border-b border-border bg-background px-6 py-4", children: /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ e.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ e.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ e.jsxs("span", { children: [
            "현재 사용자: ",
            x?.name ?? "알 수 없음",
            " (",
            x?.id ?? "unknown",
            ")"
          ] }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            "권한: ",
            v.length > 0 ? v.join(", ") : "없음"
          ] })
        ] }) }),
        /* @__PURE__ */ e.jsx(
          E,
          {
            domains: s,
            activeDomainId: b,
            isLoading: w,
            onDomainSelect: H
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx(
        $,
        {
          tabs: l,
          activeTabId: r,
          onTabSelect: L,
          onTabClose: O
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(
      "aside",
      {
        className: `relative h-full min-h-0 border-l border-b border-border bg-background transition-all duration-300 ${T ? "w-72" : "w-12"}`,
        children: T ? /* @__PURE__ */ e.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
            /* @__PURE__ */ e.jsx("span", { className: "text-sm font-semibold text-foreground", children: "AI 영역" }),
            /* @__PURE__ */ e.jsx(
              u,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => M(!1),
                children: "접기"
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "flex-1 min-h-0 overflow-auto px-4 py-6 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "text-xl font-semibold text-primary", children: [
              "Hello ",
              x?.name ?? "unknown"
            ] }),
            /* @__PURE__ */ e.jsx("div", { children: "How can I help you?" })
          ] })
        ] }) : /* @__PURE__ */ e.jsx("div", { className: "flex h-full min-h-0 items-center justify-center", children: /* @__PURE__ */ e.jsx(
          u,
          {
            type: "button",
            size: "icon",
            variant: "secondary",
            className: "h-10 w-10 rounded-full",
            "aria-label": "AI 영역 열기",
            onClick: () => M(!0),
            children: "‹"
          }
        ) })
      }
    )
  ] });
}
export {
  te as default
};
