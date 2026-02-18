import { apiGet as o, apiPost as n } from "../../../../api/httpClient.js";
const r = async (s) => o("/basic-infos/dpmasm-process/proc", s), p = async (s) => o("/basic-infos/dpmasm-process/proc-dtl", s), a = async (s) => o("/basic-infos/dpmasm-process/tab2", s), e = async (s, c) => n("/basic-infos/dpmasm-process/commands/save-proc", s, c), i = async (s, c) => n("/basic-infos/dpmasm-process/commands/save-proc-dtl", s, c), m = async () => o("/basic-infos/dpmasm-process/options/cud-types"), d = async () => o("/basic-infos/dpmasm-process/options/plants"), f = async () => o("/basic-infos/dpmasm-process/options/product-categories"), u = async () => o("/basic-infos/dpmasm-process/options/proc-types"), y = async () => o("/basic-infos/dpmasm-process/options/use-status"), b = async (s) => o("/basic-infos/dpmasm-process/options/proc-codes", s);
export {
  y as fetchDsCudCiOptions,
  m as fetchDsCudTypeOptions,
  d as fetchDsPlantOptions,
  f as fetchDsPrdCiOptions,
  b as fetchDsProcCdOptions,
  u as fetchDsProcTypeOptions,
  p as fetchProcDtlRows,
  r as fetchProcRows,
  a as fetchTab2Rows,
  i as saveProcDtlRows,
  e as saveProcRows
};
