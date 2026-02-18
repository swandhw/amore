import { authHandlers as r } from "../api/auth/mocks.js";
import { commonHandlers as o } from "../api/common/mocks.js";
import { basicInfoOverviewHandlers as e } from "../pages/basic-infos/basicInfoOverview/api/mocks.js";
import { badCodeRegisterHandlers as m } from "../pages/basic-infos/badCodeRegister/api/mocks.js";
import { newProductRegisterHandlers as n } from "../pages/basic-infos/newProductRegister/api/mocks.js";
import { dpmasmProcessHandlers as i } from "../pages/basic-infos/dpmasmProcess/api/mocks.js";
import { packagingInfoOverviewHandlers as s } from "../pages/packaging-infos/PackagingInfoOverview/api/mocks.js";
import { productionInfoOverviewHandlers as a } from "../pages/production-infos/api/mocks.js";
const g = [
  ...r,
  ...o,
  ...e,
  ...m,
  ...n,
  ...i,
  ...s,
  ...a
];
export {
  g as handlers
};
