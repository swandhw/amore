import { worker as d } from "../mocks/browser.js";
const c = [], p = (o) => {
  const e = {};
  return new URL(o).searchParams.forEach((t, n) => {
    e[n] = t;
  }), e;
}, w = () => {
  const o = typeof window < "u" ? d : null;
  if (!o) {
    console.warn("MSW Inspector: Worker not found or not running in browser environment.");
    return;
  }
  o.events.on("request:start", async ({ request: e }) => {
    const r = e.url, t = e.method;
    let n = null;
    try {
      n = await e.clone().json();
    } catch {
      n = null;
    }
    c.push({
      method: t,
      url: r,
      body: n,
      query: p(r),
      timestamp: Date.now()
    }), console.debug(`[MSW Inspector] Captured ${t} ${r}`, n);
  });
}, i = {
  setup: w,
  getLogs: () => c,
  clearLogs: () => {
    c.length = 0;
  },
  getLastRequest: (o, e) => [...c].reverse().find((t) => {
    const n = t.method.toUpperCase() === o.toUpperCase(), s = typeof e == "string" ? t.url.includes(e) : e.test(t.url);
    return n && s;
  }),
  waitForRequest: async (o, e, r = 2e3) => {
    const t = Date.now();
    return new Promise((n, s) => {
      const a = () => {
        const u = i.getLastRequest(o, e);
        if (u && u.timestamp > t) {
          n(u);
          return;
        }
        if (Date.now() - t > r) {
          s(new Error(`Timeout waiting for ${o} ${e}`));
          return;
        }
        setTimeout(a, 100);
      };
      a();
    });
  }
};
typeof window < "u" && (window.__MSW_INSPECTOR__ = i);
export {
  i as MswInspector
};
