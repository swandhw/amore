import { apiPost } from '@/api/httpClient';
import { normalizeFilterValue } from '@/lib/utils';
import type { Qsear30PrdTraceRow, Qsear30PrdTraceSearchParams, DsAuthPrdCI } from '../types/Qsear30PrdTraceTypes';
import type { ApiResponse } from '@/api/httpClient';

const QSEAR_30_PRD_TRACE_DATA: Qsear30PrdTraceRow[] = [
];

export const fetchQsear30PrdTraces = async (params?: Qsear30PrdTraceSearchParams) => {
  const cmbAuthprdci = normalizeFilterValue(params?.cmbAuthprdci);

  const filtered = QSEAR_30_PRD_TRACE_DATA.filter((row) => {
    return true;
  });

  const response: ApiResponse<Qsear30PrdTraceRow[]> = {
    result: 'true',
    message: '',
    responseBody: filtered,
  };
  return Promise.resolve(response);
};

export const saveQsear30PrdTraces = async (dsName: string, payload: Qsear30PrdTraceRow[]) =>
  apiPost<Qsear30PrdTraceRow>('/qsear-30-prd-trace', dsName, payload);

export const fetchQsear30PrdTraceGrdRoh6 = async (params?: Qsear30PrdTraceSearchParams) => {
  const cmbAuthprdci = normalizeFilterValue(params?.cmbAuthprdci);

  const response: ApiResponse<Qsear30PrdTraceRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchQsear30PrdTraceGrdHal3 = async (params?: Qsear30PrdTraceSearchParams) => {
  const cmbAuthprdci = normalizeFilterValue(params?.cmbAuthprdci);

  const response: ApiResponse<Qsear30PrdTraceRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchQsear30PrdTraceGrdFer1 = async (params?: Qsear30PrdTraceSearchParams) => {
  const cmbAuthprdci = normalizeFilterValue(params?.cmbAuthprdci);

  const response: ApiResponse<Qsear30PrdTraceRow[]> = {
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

