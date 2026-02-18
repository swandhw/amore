import { apiPost } from '@/api/httpClient';
import { normalizeFilterValue } from '@/lib/utils';
import type { DMwrkrLineFpMoniRow, DMwrkrLineFpMoniSearchParams, DsSearchListResult044Row, DsCombo3 } from '../types/DMwrkrLineFpMoniTypes';
import type { ApiResponse } from '@/api/httpClient';

const D_MWRKR_LINE_FP_MONI_DATA: DMwrkrLineFpMoniRow[] = [
];

export const fetchDMwrkrLineFpMonis = async (params?: DMwrkrLineFpMoniSearchParams) => {
  const combo1 = normalizeFilterValue(params?.combo1);
  const combo00 = normalizeFilterValue(params?.combo00);

  const filtered = D_MWRKR_LINE_FP_MONI_DATA.filter((row) => {
    return true;
  });

  const response: ApiResponse<DMwrkrLineFpMoniRow[]> = {
    result: 'true',
    message: '',
    responseBody: filtered,
  };
  return Promise.resolve(response);
};

export const saveDMwrkrLineFpMonis = async (dsName: string, payload: DMwrkrLineFpMoniRow[]) =>
  apiPost<DMwrkrLineFpMoniRow>('/d-mwrkr-line-fp-moni', dsName, payload);

export const fetchDMwrkrLineFpMoniDatagrid1 = async (params?: DMwrkrLineFpMoniSearchParams) => {
  const combo1 = normalizeFilterValue(params?.combo1);
  const combo00 = normalizeFilterValue(params?.combo00);

  const response: ApiResponse<DMwrkrLineFpMoniRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchDMwrkrLineFpMoniDatagrid3 = async (params?: DMwrkrLineFpMoniSearchParams) => {
  const combo1 = normalizeFilterValue(params?.combo1);
  const combo00 = normalizeFilterValue(params?.combo00);

  const response: ApiResponse<DMwrkrLineFpMoniRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchDMwrkrLineFpMoniDatagrid4 = async (params?: DMwrkrLineFpMoniSearchParams) => {
  const combo1 = normalizeFilterValue(params?.combo1);
  const combo00 = normalizeFilterValue(params?.combo00);

  const response: ApiResponse<DMwrkrLineFpMoniRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchDMwrkrLineFpMoniDatagrid5 = async (params?: DMwrkrLineFpMoniSearchParams) => {
  const combo1 = normalizeFilterValue(params?.combo1);
  const combo00 = normalizeFilterValue(params?.combo00);

  const response: ApiResponse<DMwrkrLineFpMoniRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchDMwrkrLineFpMoniDatagrid6 = async (params?: DMwrkrLineFpMoniSearchParams) => {
  const combo1 = normalizeFilterValue(params?.combo1);
  const combo00 = normalizeFilterValue(params?.combo00);

  const response: ApiResponse<DMwrkrLineFpMoniRow[]> = {
    result: 'true',
    message: '',
    responseBody: [],
  };
  return Promise.resolve(response);
};

export const fetchDsSearchListResult044Row = async () => {
  return new Promise<ApiResponse<DsSearchListResult044Row[]>>(resolve => {
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

export const fetchDsCombo3 = async () => {
  return new Promise<ApiResponse<DsCombo3[]>>(resolve => {
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

