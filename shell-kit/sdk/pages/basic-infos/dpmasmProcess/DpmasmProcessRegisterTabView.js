import { j as i } from "../../../jsx-runtime.js";
import * as e from "@mescius/wijmo.react.grid";
import { ResizableSplitView as o } from "../../../components/layout/ResizableSplitView.js";
const n = (r) => {
  const { onProcGridInitialized: t, onProcDtlGridInitialized: s } = r;
  return /* @__PURE__ */ i.jsx(
    o,
    {
      primary: /* @__PURE__ */ i.jsx(
        e.FlexGrid,
        {
          autoGenerateColumns: !1,
          initialized: t,
          style: { height: "100%" }
        }
      ),
      secondary: /* @__PURE__ */ i.jsx(
        e.FlexGrid,
        {
          autoGenerateColumns: !1,
          initialized: s,
          style: { height: "100%" }
        }
      )
    }
  );
};
export {
  n as DpmasmProcessRegisterTabView
};
