import { apiPost } from '@/api/httpClient';
import { normalizeFilterValue } from '@/lib/utils';
import type { DMmasmMenuRow, DMmasmMenuSearchParams, DsCombo2, DsCombo1 } from '../types/DMmasmMenuTypes';
import type { ApiResponse } from '@/api/httpClient';

const D_MMASM_MENU_DATA: DMmasmMenuRow[] = [
];

export const fetchDMmasmMenus = async (params?: DMmasmMenuSearchParams) => {
  const combo2 = normalizeFilterValue(params?.combo2);
  const combo1 = normalizeFilterValue(params?.combo1);

  const filtered = D_MMASM_MENU_DATA.filter((row) => {
    return true;
  });

  const response: ApiResponse<DMmasmMenuRow[]> = {
    result: 'true',
    message: '',
    responseBody: filtered,
  };
  return Promise.resolve(response);
};

export const saveDMmasmMenus = async (dsName: string, payload: DMmasmMenuRow[]) =>
  apiPost<DMmasmMenuRow>('/d-mmasm-menu', dsName, payload);

export const fetchDMmasmMenuDatagrid2 = async (params?: DMmasmMenuSearchParams) => {
  const combo2 = normalizeFilterValue(params?.combo2);
  const combo1 = normalizeFilterValue(params?.combo1);

  const response: ApiResponse<DMmasmMenuRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
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

