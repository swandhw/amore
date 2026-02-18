import { j as o } from "../../jsx-runtime.js";
import i from "./ProductionInfoOverviewView.js";
import { useProductionInfoOverview as n } from "./hooks/useProductionInfoOverview.js";
function a() {
  const { data: e, isLoading: r } = n();
  return /* @__PURE__ */ o.jsx(
    i,
    {
      screenName: e?.screenName ?? "생산정보 개요",
      serverTime: e?.serverTime ?? "-",
      isLoading: r
    }
  );
}
export {
  a as default
};
