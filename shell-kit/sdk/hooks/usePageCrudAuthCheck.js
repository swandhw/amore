import "../api/httpClient.js";
import { fetchCrudAuth as n } from "../api/common/permissions.js";
import { useState as o, useEffect as s } from "react";
const m = (r) => {
  const [e, u] = o();
  return s(() => {
    let t = !1;
    return n().then((c) => {
      t || u(c);
    }), () => {
      t = !0;
    };
  }, [r]), {
    auth: e,
    can: (t) => e?.[t] ?? !1
  };
};
export {
  m as usePageCrudAuth
};
