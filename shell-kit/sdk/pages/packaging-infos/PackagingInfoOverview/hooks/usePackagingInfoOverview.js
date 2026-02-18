import { useQuery as e } from "@tanstack/react-query";
import { fetchPackagingInfoOverview as r } from "../api/packagingInfoApi.js";
const n = () => e({
  queryKey: ["packaging-infos", "overview"],
  queryFn: r
});
export {
  n as usePackagingInfoOverview
};
