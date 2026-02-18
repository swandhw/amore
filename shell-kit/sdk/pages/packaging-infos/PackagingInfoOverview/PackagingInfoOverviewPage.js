import { j as i } from "../../../jsx-runtime.js";
import a from "./PackagingInfoOverviewView.js";
import { usePackagingInfoOverview as n } from "./hooks/usePackagingInfoOverview.js";
function t() {
  const { data: e, isLoading: r } = n();
  return /* @__PURE__ */ i.jsx(
    a,
    {
      screenName: e?.screenName ?? "패키징정보 개요",
      serverTime: e?.serverTime ?? "-",
      isLoading: r
    }
  );
}
export {
  t as default
};
