import { useQuery as o } from "@tanstack/react-query";
import { fetchDomainMenus as m } from "../api/domainMenuApi.js";
const u = (e) => o({
  queryKey: ["pages", "domain-menus"],
  queryFn: m,
  ...e
});
export {
  u as useDomainMenuList
};
