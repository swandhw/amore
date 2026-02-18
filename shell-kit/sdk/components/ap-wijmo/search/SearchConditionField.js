import { j as l } from "../../../jsx-runtime.js";
import * as r from "@mescius/wijmo.react.input";
const p = (d) => {
  const {
    id: u,
    label: o = "",
    type: i,
    required: n = !1,
    value: c = "",
    onChange: s
  } = d, e = c ?? null, m = () => {
    switch (i) {
      case "combo": {
        const { dataSource: a, dataPathToText: t, dataPathToValue: h } = d;
        return /* @__PURE__ */ l.jsx(
          r.ComboBox,
          {
            id: u,
            itemsSource: a,
            displayMemberPath: t,
            selectedValuePath: h,
            selectedValue: e,
            isRequired: n,
            selectedIndexChanged: (x) => {
              s(x.selectedValue ?? null);
            }
          }
        );
      }
      case "date": {
        const a = e instanceof Date ? e : e ? new Date(e) : null;
        return /* @__PURE__ */ l.jsx(
          r.InputDate,
          {
            id: u,
            value: a,
            isRequired: n,
            valueChanged: (t) => {
              s(t.value ?? null);
            }
          }
        );
      }
      case "number": {
        const a = typeof e == "number" ? e : null;
        return /* @__PURE__ */ l.jsx(
          r.InputNumber,
          {
            id: u,
            value: a,
            isRequired: n,
            valueChanged: (t) => {
              s(t.value ?? null);
            }
          }
        );
      }
      default: {
        const a = typeof e == "string" ? e : "";
        return /* @__PURE__ */ l.jsx(
          r.InputMask,
          {
            id: u,
            value: a,
            isRequired: n,
            valueChanged: (t) => {
              s(t.value ?? "");
            }
          }
        );
      }
    }
  };
  return /* @__PURE__ */ l.jsxs("div", { className: "wj-labeled-input", children: [
    m(),
    /* @__PURE__ */ l.jsx("label", { htmlFor: u, children: o })
  ] });
};
export {
  p as default
};
