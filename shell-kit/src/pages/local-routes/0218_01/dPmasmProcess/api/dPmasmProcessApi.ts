import { apiPost } from '@/api/httpClient';
import { normalizeFilterValue } from '@/lib/utils';
import type { DPmasmProcessRow, DPmasmProcessSearchParams, DsCudCi, DsProcCd, DsPrdCi, DsProcType, DsPlant } from '../types/DPmasmProcessTypes';
import type { ApiResponse } from '@/api/httpClient';

const D_PMASM_PROCESS_DATA: DPmasmProcessRow[] = [
];

export const fetchDPmasmProcesss = async (params?: DPmasmProcessSearchParams) => {
  const comboCudci = normalizeFilterValue(params?.comboCudci);
  const comboProccd = normalizeFilterValue(params?.comboProccd);
  const comboPrdci = normalizeFilterValue(params?.comboPrdci);

  const filtered = D_PMASM_PROCESS_DATA.filter((row) => {
    if (comboCudci && row.cudCi !== comboCudci) return false;
    if (comboProccd && row.procCode !== comboProccd) return false;
    if (comboPrdci && row.prdCi !== comboPrdci) return false;
    return true;
  });

  const response: ApiResponse<DPmasmProcessRow[]> = {
    result: 'true',
    message: '',
    responseBody: filtered,
  };
  return Promise.resolve(response);
};

export const saveDPmasmProcesss = async (dsName: string, payload: DPmasmProcessRow[]) =>
  apiPost<DPmasmProcessRow>('/d-pmasm-process', dsName, payload);

export const fetchDPmasmProcessGrdProcdtl = async (params?: DPmasmProcessSearchParams) => {
  const comboCudci = normalizeFilterValue(params?.comboCudci);
  const comboProccd = normalizeFilterValue(params?.comboProccd);
  const comboPrdci = normalizeFilterValue(params?.comboPrdci);

  const response: ApiResponse<DPmasmProcessRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchDPmasmProcessGrdGridt2 = async (params?: DPmasmProcessSearchParams) => {
  const comboCudci = normalizeFilterValue(params?.comboCudci);
  const comboProccd = normalizeFilterValue(params?.comboProccd);
  const comboPrdci = normalizeFilterValue(params?.comboPrdci);

  const response: ApiResponse<DPmasmProcessRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchDsCudCi = async () => {
  return new Promise<ApiResponse<DsCudCi[]>>(resolve => {
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

export const fetchDsProcCd = async () => {
  return new Promise<ApiResponse<DsProcCd[]>>(resolve => {
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

export const fetchDsPrdCi = async () => {
  return new Promise<ApiResponse<DsPrdCi[]>>(resolve => {
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

export const fetchDsProcType = async () => {
  return new Promise<ApiResponse<DsProcType[]>>(resolve => {
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

export const fetchDsPlant = async () => {
  return new Promise<ApiResponse<DsPlant[]>>(resolve => {
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

