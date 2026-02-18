import e from "../../../api/httpClient.js";
const s = async () => (await e.get("/pages/domain-menus")).data;
export {
  s as fetchDomainMenus
};
