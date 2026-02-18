import { j as e } from "../../../jsx-runtime.js";
import { Tabs as u, TabsList as p, TabsTrigger as r, TabsContent as t } from "../../../components/ui/tabs.js";
import { ViewFill as x } from "../../../components/layout/ViewFill.js";
import h from "../../../components/common-control/CommonButtons.js";
import { DpmasmProcessStatusTabView as j } from "./DpmasmProcessStatusTabView.js";
import { DpmasmProcessRegisterTabView as T } from "./DpmasmProcessRegisterTabView.js";
const w = (i) => {
  const {
    t: s,
    activeTab: o,
    onTabChange: a,
    searchSection: n,
    commonButtonsProps: m,
    onProcGridInitialized: l,
    onProcDtlGridInitialized: c,
    onTab2GridInitialized: d
  } = i;
  return /* @__PURE__ */ e.jsxs(x, { variant: "root", children: [
    /* @__PURE__ */ e.jsx(
      h,
      {
        ...m
      }
    ),
    /* @__PURE__ */ e.jsx("header", { className: "shrink-0", children: n }),
    /* @__PURE__ */ e.jsxs(u, { value: o, onValueChange: a, children: [
      /* @__PURE__ */ e.jsxs(p, { children: [
        /* @__PURE__ */ e.jsx(r, { value: "register", children: s("표준공정 등록") }),
        /* @__PURE__ */ e.jsx(r, { value: "status", children: s("표준공정 현황") })
      ] }),
      /* @__PURE__ */ e.jsx(t, { value: "register", keepMounted: !0, children: /* @__PURE__ */ e.jsx(
        T,
        {
          onProcGridInitialized: l,
          onProcDtlGridInitialized: c
        }
      ) }),
      /* @__PURE__ */ e.jsx(t, { value: "status", keepMounted: !0, children: /* @__PURE__ */ e.jsx(
        j,
        {
          onTab2GridInitialized: d
        }
      ) })
    ] })
  ] });
};
export {
  w as default
};
