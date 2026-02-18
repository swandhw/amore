import { j as r } from "../jsx-runtime.js";
import { useEffect as t } from "react";
import * as i from "@mescius/wijmo";
import { loadWijmoCulture as e } from "../bootstrap/loadWijimoCulture.js";
function a({ culture: o, children: m }) {
  return t(() => {
    e(o), i.changeCulture(o);
  }, [o]), /* @__PURE__ */ r.jsx(r.Fragment, { children: m });
}
export {
  a as WijmoBootstrap
};
