import { j as e } from "../../../jsx-runtime.js";
import { Card as p } from "../../../components/ui/card.js";
import n from "react";
import * as r from "@mescius/wijmo.react.grid";
import { data as j, getSparklines as b } from "./hooks/data.js";
import * as w from "@mescius/wijmo.react.input";
const g = typeof window < "u" ? (
  // useInsertionEffect is available in React 18+
  n.useInsertionEffect || n.useLayoutEffect
) : () => {
};
function N(s) {
  const i = n.useRef(y);
  g(() => {
    i.current = s;
  }, [s]);
  const t = n.useRef(null);
  return t.current || (t.current = function() {
    return i.current.apply(this, arguments);
  }), t.current;
}
function y() {
  throw new Error("INVALID_USEEVENT_INVOCATION: the callback from useEvent cannot be invoked before the component has mounted.");
}
function G({ screenName: s, serverTime: i, isLoading: t }) {
  const l = n.useRef(null), a = N((o) => {
    o.formatItem.addHandler(function(d, c) {
      const { panel: m, row: u, col: x, cell: f } = c;
      if (m === d.cells) {
        const h = d.rows[u].dataItem;
        d.columns[x].binding === "trends" && (f.innerHTML = b(h.trends));
      }
    });
  });
  return /* @__PURE__ */ e.jsxs("div", { className: "flex min-h-screen flex-col gap-6 bg-background  bg-slate-50 p-8", children: [
    /* @__PURE__ */ e.jsxs("header", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-semibold text-primary ", children: "기본정보 개요" }),
      /* @__PURE__ */ e.jsx("p", { className: "mt-2 text-sm text-primary ", children: "선택한 업무 도메인의 샘플 화면입니다." })
    ] }),
    /* @__PURE__ */ e.jsx(p, { className: "max-w-xl border border-slate-200 bg-white p-6 shadow-sm", children: /* @__PURE__ */ e.jsxs("dl", { className: "space-y-4", children: [
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "text-xs font-semibold uppercase text-primary ", children: "현재 화면명" }),
        /* @__PURE__ */ e.jsx("dd", { className: "mt-1 text-lg font-semibold text-primary ", children: t ? "불러오는 중..." : s })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("dt", { className: "text-xs font-semibold uppercase text-primary ", children: "서버 시간" }),
        /* @__PURE__ */ e.jsx("dd", { className: "mt-1 text-sm text-primary ", children: t ? "불러오는 중..." : i })
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsxs(
      r.FlexGrid,
      {
        ref: l,
        autoGenerateColumns: !1,
        headersVisibility: "Column",
        isReadOnly: !0,
        itemsSource: j,
        initialized: a,
        children: [
          /* @__PURE__ */ e.jsx(r.FlexGridColumn, { binding: "id", header: "ID", width: 40 }),
          /* @__PURE__ */ e.jsx(r.FlexGridColumn, { binding: "country", header: "국가명" }),
          /* @__PURE__ */ e.jsx(
            r.FlexGridColumn,
            {
              binding: "sales",
              header: "판매액",
              format: "c0",
              width: "2*"
            }
          ),
          /* @__PURE__ */ e.jsx(r.FlexGridColumn, { binding: "trends", header: "트렌드", width: "2*" }),
          /* @__PURE__ */ e.jsx(r.FlexGridColumn, { binding: "active", header: "활성화", width: "2*" })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(w.Calendar, { initialized: null })
  ] });
}
export {
  G as default
};
