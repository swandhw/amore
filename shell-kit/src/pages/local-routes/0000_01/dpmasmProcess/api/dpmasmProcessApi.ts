import { apiGet, apiPost } from '@/api/httpClient';

import type {
  DpmasmProcessSearchParams,
  DsCudCiOption,
  DsPlantOption,
  DsProcCdOption,
  DsProcDtlRow,
  DsProcRow,
  DsProcTypeOption,
  DsPrdCiOption,
  DsTab2Row,
} from '../types/DpmasmProcessTypes';

const STR_ARGUMENT_FIND = 'this.gfn_GetDatasetToPram(this,oDsSet)+this.gfn_GetFilterParam(this.voFilterGrid)';
const STR_ARGUMENT_SAVE = 'this.gfn_GetTranInfo("CHNG_ID|PROC_ID|LANG_TYPE||PLANT")';
const STR_ARGUMENT_CODE = 'this.gfn_GetTranInfo("PLANT|LANG_TYPE|CHNG_ID")';

export const fetchProcRowsByFindProc = async (filter?: Partial<DpmasmProcessSearchParams>) => {
  return apiGet<DsProcRow[], DpmasmProcessSearchParams>(
    '/basic-infos/dpmasm-process/proc',
    filter,
    STR_ARGUMENT_FIND,
  );
};

export const fetchProcDtlRowsByFindProcDtl = async (filter?: Partial<DpmasmProcessSearchParams>) => {
  return apiGet<DsProcDtlRow[], DpmasmProcessSearchParams>(
    '/basic-infos/dpmasm-process/proc-dtl',
    filter,
    STR_ARGUMENT_FIND,
  );
};

export const fetchTab2RowsByFindT2 = async (filter?: Partial<DpmasmProcessSearchParams>) => {
  return apiGet<DsTab2Row[], DpmasmProcessSearchParams>(
    '/basic-infos/dpmasm-process/tab2',
    filter,
    STR_ARGUMENT_FIND,
  );
};

export const saveProcRowsBySaveProc = async (dsName : string, payload: DsProcRow[]) => {
  return apiPost<DsProcRow>(
    '/basic-infos/dpmasm-process/commands/save-proc',
    dsName,
    payload,
    STR_ARGUMENT_SAVE,
  );
};

export const saveProcDtlRowsBySaveProcDtl = async (dsName : string, payload: DsProcDtlRow[]) => {
  return apiPost<DsProcDtlRow>(
    '/basic-infos/dpmasm-process/commands/save-proc-dtl',
    dsName,
    payload,
    STR_ARGUMENT_SAVE,
  );
};

export const fetchDsPlantOptions = async () => {
  return apiGet<DsPlantOption[]>(
    '/basic-infos/dpmasm-process/options/plants',
    undefined,
    STR_ARGUMENT_CODE,
  );
};

export const fetchDsPrdCiOptions = async () => {
  return apiGet<DsPrdCiOption[]>(
    '/basic-infos/dpmasm-process/options/product-categories',
    undefined,
    STR_ARGUMENT_CODE,
  );
};

export const fetchDsProcTypeOptions = async () => {
  return apiGet<DsProcTypeOption[]>(
    '/basic-infos/dpmasm-process/options/proc-types',
    undefined,
    STR_ARGUMENT_CODE,
  );
};

export const fetchDsCudCiOptions = async () => {
  return apiGet<DsCudCiOption[]>(
    '/basic-infos/dpmasm-process/options/use-status',
    undefined,
    STR_ARGUMENT_CODE,
  );
};

export const fetchDsProcCdOptionsByFindProcCode = async (filter?: Partial<DpmasmProcessSearchParams>) => {
  return apiGet<DsProcCdOption[], DpmasmProcessSearchParams>(
    '/basic-infos/dpmasm-process/options/proc-codes',
    filter,
    STR_ARGUMENT_FIND,
  );
};
