import { j as e } from "../../../jsx-runtime.js";
import * as s from "@mescius/wijmo.react.grid";
const o = (t) => {
  const { onTab2GridInitialized: i } = t;
  return /* @__PURE__ */ e.jsx(
    s.FlexGrid,
    {
      autoGenerateColumns: !1,
      initialized: i,
      style: { height: "100%" }
    }
  );
};
export {
  o as DpmasmProcessStatusTabView
};
