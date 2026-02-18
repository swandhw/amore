import { j as i } from "../../../jsx-runtime.js";
import s from "./BasicInfoOverviewView.js";
import { useBasicInfoOverview as o } from "./hooks/useBasicInfoOverview.js";
function t() {
  const { data: e, isLoading: r } = o();
  return /* @__PURE__ */ i.jsx(
    s,
    {
      screenName: e?.screenName ?? "기본정보 개요",
      serverTime: e?.serverTime ?? "-",
      isLoading: r
    }
  );
}
export {
  t as default
};
