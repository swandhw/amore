import { j as e } from "../../../jsx-runtime.js";
import * as t from "@mescius/wijmo.react.input";
import * as o from "@mescius/wijmo.react.grid";
import { ViewFill as d } from "../../../components/layout/ViewFill.js";
import m from "../../../components/common-control/CommonButtons.js";
const x = (s) => {
  const {
    categoryDataset: a,
    useStatusDataset: i,
    commonButtonsProps: r,
    onGridInitialized: l
  } = s;
  return /* @__PURE__ */ e.jsxs(d, { variant: "root", children: [
    /* @__PURE__ */ e.jsx(
      m,
      {
        ...r
      }
    ),
    /* @__PURE__ */ e.jsxs("header", { children: [
      /* @__PURE__ */ e.jsx("h1", { className: "text-2xl font-semibold text-primary", children: "조회조건" }),
      /* @__PURE__ */ e.jsxs("span", { style: { display: "flex" }, children: [
        /* @__PURE__ */ e.jsxs("div", { className: "wj-labeled-input", children: [
          /* @__PURE__ */ e.jsx(
            t.ComboBox,
            {
              id: "categoryFilter",
              itemsSource: a,
              displayMemberPath: "name",
              selectedValuePath: "code"
            }
          ),
          /* @__PURE__ */ e.jsx("label", { htmlFor: "categoryFilter", children: "카테고리" })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "wj-labeled-input", children: [
          /* @__PURE__ */ e.jsx(
            t.ComboBox,
            {
              id: "useStatusFilter",
              itemsSource: i,
              displayMemberPath: "name",
              selectedValuePath: "code"
            }
          ),
          /* @__PURE__ */ e.jsx("label", { htmlFor: "useStatusFilter", children: "사용유무" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      o.FlexGrid,
      {
        autoClipboard: !1,
        autoGenerateColumns: !1,
        initialized: l,
        style: { height: "100%" }
      }
    )
  ] });
};
export {
  x as default
};
