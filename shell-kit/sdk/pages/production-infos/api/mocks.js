import { http as e, delay as t, HttpResponse as o } from "msw";
const n = [
  e.get("/api/bff/production-infos/overview", async () => (await t(300), o.json({
    screenName: "생산정보 개요",
    serverTime: (/* @__PURE__ */ new Date()).toISOString()
  })))
];
export {
  n as productionInfoOverviewHandlers
};
