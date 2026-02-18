import { apiPost as t, apiGet as r } from "../../../../api/httpClient.js";
const c = async () => r("/basic-infos/new-products"), n = async (e, s) => t("sample", e, s);
export {
  c as fetchNewProductRegisters,
  n as saveNewProductRegisters
};
