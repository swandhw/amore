import { useContext as d, useRef as f, useEffect as s, useCallback as b } from "react";
import { CloseGuardContext as i, CloseGuardTabContext as x } from "./CloseGuardContexts.js";
const k = () => d(i), G = () => d(x), T = ({ isDirty: n, hasChanges: t }) => {
  const c = k(), e = G(), r = c?.registerChecker, o = c?.reEvaluateTabDirty, u = f(t), a = !!t;
  s(() => {
    u.current = t;
  }, [t]);
  const l = b(() => {
    const C = u.current;
    return C ? C() : !1;
  }, []);
  s(() => {
    if (!(!r || !e || !a))
      return r(e, l);
  }, [r, e, a, l]), s(() => {
    !o || !e || n === void 0 || o(e);
  }, [o, e, n]);
};
export {
  T as useCloseGuard,
  k as useCloseGuardContext,
  G as useCloseGuardTabId
};
