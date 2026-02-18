import { http as e, delay as t, HttpResponse as r } from "msw";
const s = [
  e.get("/api/bff/basic-infos/overview", async () => (await t(500), r.json({
    screenName: "기본정보 개요",
    serverTime: (/* @__PURE__ */ new Date()).toISOString()
  })))
];
export {
  s as basicInfoOverviewHandlers
};
