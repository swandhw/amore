import o from "../../../api/httpClient.js";
const n = async () => (await o.get("/production-infos/overview")).data;
export {
  n as fetchProductionInfoOverview
};
