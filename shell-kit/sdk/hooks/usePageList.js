import { useMemo as u } from "react";
import { useQuery as i } from "@tanstack/react-query";
import { fetchAccessiblePages as n } from "../api/common/menus.js";
import { L as s, m } from "../Routes.js";
const y = (t) => {
  const { enabled: e = !0, ...o } = t ?? {}, r = i({
    queryKey: ["pages"],
    queryFn: n,
    enabled: e,
    ...o
  }), a = u(() => e ? m(s, r.data?.pages ?? []) : s, [e, r.data]);
  return {
    ...r,
    routes: a,
    isLoading: e ? r.isLoading : !1
  };
};
export {
  y as usePageList
};
