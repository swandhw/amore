import { useQuery as e } from "@tanstack/react-query";
import { fetchBasicInfoOverview as r } from "../api/basicInfoApi.js";
const s = () => e({
  queryKey: ["basic-infos", "overview"],
  queryFn: r
});
export {
  s as useBasicInfoOverview
};
