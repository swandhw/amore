import { j as e } from "../../../jsx-runtime.js";
import s from "./SearchConditionField.js";
const x = (u) => {
  const {
    fields: c,
    values: o,
    onValuesChange: n,
    className: h
  } = u, r = (a, t) => {
    n && n((d) => ({
      ...d,
      [a]: t
    }));
  };
  return /* @__PURE__ */ e.jsx("div", { className: h ?? "flex flex-wrap items-center gap-4", children: c.map((a) => a.type === "combo" ? /* @__PURE__ */ e.jsx(
    s,
    {
      ...a,
      value: o[a.id],
      onChange: (t) => r(a.id, t),
      dataSource: a.dataSource,
      dataPathToText: a.dataPathToText,
      dataPathToValue: a.dataPathToValue
    },
    a.id
  ) : /* @__PURE__ */ e.jsx(
    s,
    {
      ...a,
      value: o[a.id],
      onChange: (t) => r(a.id, t)
    },
    a.id
  )) });
};
export {
  x as default
};
