import { useMemo as s } from "react";
import { usePageList as a } from "./usePageList.js";
import { useAuthStore as i } from "../stores/auth-store.js";
import { L as o, m as u } from "../Routes.js";
const L = () => {
  const { isAuthenticated: e } = i(), { data: t, isLoading: r } = a({
    enabled: e
  });
  return { routes: s(() => e ? u(o, t?.pages ?? []) : o, [e, t]), isLoading: e ? r : !1 };
};
export {
  L as useAppRoutes
};
