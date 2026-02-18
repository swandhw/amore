import e from "../../../../api/httpClient.js";
const s = async () => (await e.get("/basic-infos/overview")).data;
export {
  s as fetchBasicInfoOverview
};
