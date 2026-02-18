import { j as e } from "../../../jsx-runtime.js";
import * as n from "@mescius/wijmo.react.grid";
import { ViewFill as i } from "../../../components/layout/ViewFill.js";
import a from "../../../components/common-control/CommonButtons.js";
const c = (o) => {
  const {
    searchSection: r,
    commonButtonsProps: t,
    onGridInitialized: s
  } = o;
  return /* @__PURE__ */ e.jsxs(i, { variant: "root", children: [
    /* @__PURE__ */ e.jsx(
      a,
      {
        ...t
      }
    ),
    /* @__PURE__ */ e.jsx("header", { className: "shrink-0", children: r }),
    /* @__PURE__ */ e.jsx(i, { children: /* @__PURE__ */ e.jsx(
      n.FlexGrid,
      {
        autoGenerateColumns: !1,
        initialized: s,
        style: { height: "100%" }
      }
    ) })
  ] });
};
export {
  c as default
};
