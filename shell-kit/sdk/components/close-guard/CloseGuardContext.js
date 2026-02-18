import { j as o } from "../../jsx-runtime.js";
import { useState as T, useRef as P, useCallback as s, useMemo as w } from "react";
import { AlertDialog as G, AlertDialogContent as S, AlertDialogHeader as R, AlertDialogTitle as E, AlertDialogDescription as M, AlertDialogFooter as z, AlertDialogCancel as B, AlertDialogAction as F } from "../ui/alert-dialog.js";
import { CloseGuardContext as H, CloseGuardTabContext as O } from "./CloseGuardContexts.js";
const L = ({ children: h }) => {
  const [n, l] = T(null), [d, f] = T({}), c = P(/* @__PURE__ */ new Map()), x = s((e, r) => {
    let t = c.current.get(e);
    return t || (t = /* @__PURE__ */ new Set(), c.current.set(e, t)), t.add(r), () => {
      const a = c.current.get(e);
      a && (a.delete(r), a.size === 0 && (c.current.delete(e), f((D) => {
        if (!(e in D)) return D;
        const A = { ...D };
        return delete A[e], A;
      })));
    };
  }, []), u = s((e, r) => {
    f((t) => t[e] === r ? t : { ...t, [e]: r });
  }, []), i = s((e) => {
    const r = c.current.get(e), t = Array.from(r ?? []).some((a) => a());
    return u(e, t), t;
  }, [u]), C = s((e) => {
    i(e);
  }, [i]), g = s((e) => d[e] ?? !1, [d]), m = s((e, r) => {
    if (!i(e)) {
      r();
      return;
    }
    l({ tabId: e, onConfirm: r, reason: "close" });
  }, [i]), y = s((e, r) => {
    if (!i(e)) {
      r();
      return;
    }
    l({ tabId: e, onConfirm: r, reason: "switch" });
  }, [i]), j = s((e, r) => {
    if (!i(e)) {
      r();
      return;
    }
    l({ tabId: e, onConfirm: r, reason: "search" });
  }, [i]), p = s(() => {
    l(null);
  }, []), v = s(() => {
    n && (n.onConfirm(), l(null));
  }, [n]), k = w(() => ({
    registerChecker: x,
    setTabDirty: u,
    isTabDirty: g,
    attemptClose: m,
    attemptSwitch: y,
    attemptSearch: j,
    reEvaluateTabDirty: C
  }), [x, u, g, m, y, j, C]);
  return /* @__PURE__ */ o.jsxs(H.Provider, { value: k, children: [
    h,
    /* @__PURE__ */ o.jsx(
      G,
      {
        open: !!n,
        onOpenChange: (e) => {
          e || p();
        },
        children: /* @__PURE__ */ o.jsxs(S, { children: [
          /* @__PURE__ */ o.jsxs(R, { children: [
            /* @__PURE__ */ o.jsx(E, { children: "변경사항이 있습니다" }),
            /* @__PURE__ */ o.jsx(M, { children: n?.reason === "close" ? "저장되지 않은 변경사항이 있습니다. 그래도 닫을까요?" : n?.reason === "search" ? "변경사항을 잃게 됩니다. 그래도 다시 조회 할까요?" : "변경사항을 잃게 됩니다. 그래도 화면을 전환할까요?" })
          ] }),
          /* @__PURE__ */ o.jsxs(z, { children: [
            /* @__PURE__ */ o.jsx(B, { variant: "outline", onClick: p, children: "취소" }),
            /* @__PURE__ */ o.jsx(F, { variant: "destructive", onClick: v, children: n?.reason === "close" ? "닫기" : n?.reason === "search" ? "다시 조회" : "전환" })
          ] })
        ] })
      }
    )
  ] });
}, N = ({
  tabId: h,
  children: n
}) => /* @__PURE__ */ o.jsx(O.Provider, { value: h, children: n });
export {
  L as CloseGuardProvider,
  N as CloseGuardTabProvider
};
