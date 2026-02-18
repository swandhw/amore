import { http as e, delay as n, HttpResponse as t } from "msw";
const r = [
  e.get("/api/bff/packaging-infos/overview", async () => (await n(300), t.json({
    screenName: "패키징정보 개요",
    serverTime: (/* @__PURE__ */ new Date()).toISOString()
  })))
];
export {
  r as packagingInfoOverviewHandlers
};
