import e from "../../../../api/httpClient.js";
const o = async () => (await e.get("/packaging-infos/overview")).data;
export {
  o as fetchPackagingInfoOverview
};
