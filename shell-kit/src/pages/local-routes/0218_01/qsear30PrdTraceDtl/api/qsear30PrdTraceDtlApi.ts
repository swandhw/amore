import { apiPost } from '@/api/httpClient';
import { normalizeFilterValue } from '@/lib/utils';
import type { Qsear30PrdTraceDtlRow, Qsear30PrdTraceDtlSearchParams, DsAuthPrdCI } from '../types/Qsear30PrdTraceDtlTypes';
import type { ApiResponse } from '@/api/httpClient';

const QSEAR_30_PRD_TRACE_DTL_DATA: Qsear30PrdTraceDtlRow[] = [
];

export const fetchQsear30PrdTraceDtls = async (params?: Qsear30PrdTraceDtlSearchParams) => {
  const cmbAuthprdci = normalizeFilterValue(params?.cmbAuthprdci);

  const filtered = QSEAR_30_PRD_TRACE_DTL_DATA.filter((row) => {
    return true;
  });

  const response: ApiResponse<Qsear30PrdTraceDtlRow[]> = {
    result: 'true',
    message: '',
    responseBody: filtered,
  };
  return Promise.resolve(response);
};

export const saveQsear30PrdTraceDtls = async (dsName: string, payload: Qsear30PrdTraceDtlRow[]) =>
  apiPost<Qsear30PrdTraceDtlRow>('/qsear-30-prd-trace-dtl', dsName, payload);

export const fetchQsear30PrdTraceDtlGrdRoh6 = async (params?: Qsear30PrdTraceDtlSearchParams) => {
  const cmbAuthprdci = normalizeFilterValue(params?.cmbAuthprdci);

  const response: ApiResponse<Qsear30PrdTraceDtlRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchQsear30PrdTraceDtlGrdHal3 = async (params?: Qsear30PrdTraceDtlSearchParams) => {
  const cmbAuthprdci = normalizeFilterValue(params?.cmbAuthprdci);

  const response: ApiResponse<Qsear30PrdTraceDtlRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchQsear30PrdTraceDtlGrdFer1 = async (params?: Qsear30PrdTraceDtlSearchParams) => {
  const cmbAuthprdci = normalizeFilterValue(params?.cmbAuthprdci);

  const response: ApiResponse<Qsear30PrdTraceDtlRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchDsAuthPrdCI = async () => {
  return new Promise<ApiResponse<DsAuthPrdCI[]>>(resolve => {
    setTimeout(() => {
      resolve({
        result: 'true',
        message: '',
        responseBody: [
        ],
      });
    }, 2_000);
  });
};

