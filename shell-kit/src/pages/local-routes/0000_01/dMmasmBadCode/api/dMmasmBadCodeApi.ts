import { apiGet, apiPost } from '@/api/httpClient';
import type { DMmasmBadCodeRow, DMmasmBadCodeSearchParams, DsSearchListResult535Row, DsSearchListResult14Row, DsCombo1, DsCombo2 } from '../types/DMmasmBadCodeTypes';

const STR_ARGUMENT_FIND = 'this.gfn_GetDatasetToPram(this,oDsSet)+this.gfn_GetFilterParam(this.voFilterGrid)';
const STR_ARGUMENT_SAVE = 'this.gfn_GetTranInfo("CHNG_ID|PROC_ID|LANG_TYPE||PLANT")';
const STR_ARGUMENT_CODE = 'this.gfn_GetTranInfo("PLANT|LANG_TYPE|CHNG_ID")';

export const fetchDMmasmBadCodesByFind = async (params?: DMmasmBadCodeSearchParams) => {
  return apiGet<DMmasmBadCodeRow[], DMmasmBadCodeSearchParams>(
    '/basic-infos/ai-transform/d-mmasm-bad-code',
    params,
    STR_ARGUMENT_FIND,
  );
};

export const saveDMmasmBadCodesByMulti = async (dsName: string, payload: DMmasmBadCodeRow[]) =>
  apiPost<DMmasmBadCodeRow>(
    '/basic-infos/ai-transform/d-mmasm-bad-code/commands/save',
    dsName,
    payload,
    STR_ARGUMENT_SAVE,
  );

export const fetchDsSearchListResult535Row = async () => {
  return apiGet<DsSearchListResult535Row[]>(
    '/basic-infos/ai-transform/d-mmasm-bad-code/options/searchlistresult535-row',
    undefined,
    STR_ARGUMENT_CODE,
  );
};

export const fetchDsSearchListResult14Row = async () => {
  return apiGet<DsSearchListResult14Row[]>(
    '/basic-infos/ai-transform/d-mmasm-bad-code/options/searchlistresult14-row',
    undefined,
    STR_ARGUMENT_CODE,
  );
};

export const fetchDsCombo1 = async () => {
  return apiGet<DsCombo1[]>(
    '/basic-infos/ai-transform/d-mmasm-bad-code/options/combo1',
    undefined,
    STR_ARGUMENT_CODE,
  );
};

export const fetchDsCombo2 = async () => {
  return apiGet<DsCombo2[]>(
    '/basic-infos/ai-transform/d-mmasm-bad-code/options/combo2',
    undefined,
    STR_ARGUMENT_CODE,
  );
};

