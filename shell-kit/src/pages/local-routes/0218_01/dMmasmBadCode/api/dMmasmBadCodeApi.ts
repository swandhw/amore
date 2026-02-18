import { apiPost } from '@/api/httpClient';
import { normalizeFilterValue } from '@/lib/utils';
import type { DMmasmBadCodeRow, DMmasmBadCodeSearchParams, DsSearchListResult535Row, DsSearchListResult14Row, DsCombo1, DsCombo2 } from '../types/DMmasmBadCodeTypes';
import type { ApiResponse } from '@/api/httpClient';

const D_MMASM_BAD_CODE_DATA: DMmasmBadCodeRow[] = [
];

export const fetchDMmasmBadCodes = async (params?: DMmasmBadCodeSearchParams) => {
  const combo1 = normalizeFilterValue(params?.combo1);
  const combo2 = normalizeFilterValue(params?.combo2);

  const filtered = D_MMASM_BAD_CODE_DATA.filter((row) => {
    if (combo1 && row.badCi !== combo1) return false;
    if (combo2 && row.cudCi !== combo2) return false;
    return true;
  });

  const response: ApiResponse<DMmasmBadCodeRow[]> = {
    result: 'true',
    message: '',
    responseBody: filtered,
  };
  return Promise.resolve(response);
};

export const saveDMmasmBadCodes = async (dsName: string, payload: DMmasmBadCodeRow[]) =>
  apiPost<DMmasmBadCodeRow>('/d-mmasm-bad-code', dsName, payload);

export const fetchDsSearchListResult535Row = async () => {
  return new Promise<ApiResponse<DsSearchListResult535Row[]>>(resolve => {
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

export const fetchDsSearchListResult14Row = async () => {
  return new Promise<ApiResponse<DsSearchListResult14Row[]>>(resolve => {
    setTimeout(() => {
      resolve({
        result: 'true',
        message: '',
        responseBody: [
          { codeKorName: 'Yes', commCode: 'Y' },
          { codeKorName: 'No', commCode: 'N' },
        ],
      });
    }, 2_000);
  });
};

export const fetchDsCombo1 = async () => {
  return new Promise<ApiResponse<DsCombo1[]>>(resolve => {
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

export const fetchDsCombo2 = async () => {
  return new Promise<ApiResponse<DsCombo2[]>>(resolve => {
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

