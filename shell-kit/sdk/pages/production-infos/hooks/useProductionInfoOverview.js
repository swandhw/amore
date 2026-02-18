import { useQuery as o } from "@tanstack/react-query";
import { fetchProductionInfoOverview as e } from "../api/productionInfoApi.js";
const n = () => o({
  queryKey: ["production-infos", "overview"],
  queryFn: e
});
export {
  n as useProductionInfoOverview
};
